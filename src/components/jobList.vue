<template>
    <div class="container shadow p-5 mb-2 rounded bg-light-grayish-cyan">
        <div :class="listFilters.length === 0 ? 'card shadow p-0 bg-body rounded-start border-0 invisible filer-pane' 
        : 'card shadow p-0 bg-body rounded-start border-0 visible filter-pane'">
            <div class="card-body d-flex w-100">
                <div class="flex-fill d-flex align-content-around flex-wrap">
                    <template v-for="item in listFilters" :key="item.id">
                        <div class="d-flex flex-row mt-2 mb-2">
                                <h6 class="text-success fw-bolder h-100  fs-6 ms-2 ps-3 pe-3 pt-2 rounded-start bg-light-grayish-cyan">{{ item.name }}</h6>
                                <div @click="removeListFilter(item)" class="h-100 bg-success rounded-end close-button button-close">
                                    <img style="width:36px; height: 36px" alt="..." src="../common/images/close.png">
                                </div>
                        </div>
                    </template>
                </div>
                <div class="float-end w-auto d-flex align-items-center pe-2">
                    <button @click="clearListFilter" class="border-0 bg-white text-success text-decoration-underline fs-6 fw-bolder float-end button-clear">Clear</button>
                </div>
            </div>
        </div>  
        <template v-for="item in displayedItems" :key="item.id">
            <div :class="item.isFeature === true ? 'card shadow p-0 bg-body rounded border-4 border-top-0 border-end-0 border-bottom-0 border-success'
                    : 'card shadow p-0 bg-body rounded border-0'">
                <div class="card-body d-flex flex-row item-body">
                    <div class="w-auto float-start align-items-center item-image">
                        <img class="p-2" alt="..." :src="resolve_img_url(item.image)">
                    </div>
                    
                    <div class="p-2 d-flex flex-column content">
                        <div class="d-flex flex-row">
                            <h6 class="card-title text-success fw-bolder fs-6">{{ item.name }}</h6>
                            <h6 :hidden="item.isNew === true ? false : true" class="ms-3 ps-3 pe-3 pt-1 pb-1 bg-success rounded-pill text-white fw-bold fs-6">NEW!</h6>
                            <h6 :hidden="item.isFeature === true ? false : true" class="ms-3 ps-3 pe-3 pt-1 pb-1 bg-dark rounded-pill text-white fw-bold fs-6">FEATURE</h6>
                        </div>
                        <div class="d-flex d-flex justify-content-between">
                            <div>
                                <h5 @click="getListFilter(item.details)" class="card-text text-start fw-bolder item-title">{{item.title}}</h5>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-2">
                            <span class="me-3 text-center text-secondary fs-6">{{ item.time }}</span>
                            <div class="h-100 position-relative me-3">
                                <img alt="dot" src="../common/images/black-circle.png" class="position-absolute top-50 start-0 translate-middle-y" style="width:4px; height: 4px;">
                            </div>
                            <span class="me-3 text-center text-secondary fs-6">{{item.workTime}}</span>
                            <div class="h-100 position-relative me-3">
                                <img alt="dot" src="../common/images/black-circle.png" class="position-absolute top-50 start-0 translate-middle-y" style="width:4px; height: 4px;">
                            </div>
                            <span class="me-3 text-center text-secondary fs-6">{{item.workPlace}}</span>
                        </div>
                    </div>
                    <div class="flex-fill d-flex flex-wrap align-items-center pe-2 detail-pane">
                        <template v-for="detail in item.details" :key="detail.id">
                            <div class="me-2">
                                <button @click="updateListFilter(detail)" class="tech-item text-success fw-bolder border-0 fs-6 p-1 pe-2 ps-2 mb-2  rounded bg-light-grayish-cyan tech-item">{{ detail.name }}</button>    
                            </div>
                        </template>      
                    </div>
                </div>
            </div>
        </template>
        
    </div>
</template> 
<script lang="ts" setup>
import { ref } from 'vue';
import { JobDetail, Filter  } from './jobDetail';

        const listItems:JobDetail[] = [
            {image: "photosnap.svg", name: "Photosnap", isNew: true, isFeature: true, title: "Senior Frontend Developer", time: "1d ago", workTime:"Full Time", workPlace: "USA only", 
                details: [{name:"Frontend"}, {name:"Senior"}, {name: "HTML"}, {name: "CSS"}, {name: "Javascript"}]},
            {image: 'manage.svg',name: "Manage", isNew: true, isFeature: true, title: "Fullstack Developer", time: "1d ago", workTime:"Part Time", workPlace: "Remote", 
                details: [{name:"Frontend"}, {name:"Fullstack"}, {name: "Midweight"}, {name: "Python"}, {name: "React"}]},
            {image: 'account.svg',name: "Accnount", isNew: true, isFeature: false, title: "Junior Frontend Developer", time: "2d ago", workTime:"Part Time", workPlace: "USA only", 
                details: [{name:"Frontend"}, {name:"Junior"}, {name: "React"}, {name: "Sass"}, {name: "Javascript"}]},
            {image: 'myhome.svg',name: "MyHome", isNew: false, isFeature: false, title: "Junior Frontend Developer", time: "5d ago", workTime:"Contract", workPlace: "USA only", 
                details: [{name:"Frontend"}, {name:"Junior"}, {name: "CSS"}, {name: "Javascript"}]},
            {image: 'loop-studios.svg',name: "Loop Studios", isNew: false, isFeature: false, title: "Software Engineer", time: "1w ago", workTime:"Full Time", workPlace: "Worldwide", 
                details: [{name:"Fullstack"}, {name:"Midweight"}, {name: "JavaScript"}, {name: "Sass"}, {name: "Ruby"}]},
            {image: 'faceit.svg',name: "FaceIt", isNew: false, isFeature: false, title: "Junior Backend Developer", time: "2w ago", workTime:"Full Time", workPlace: "UK only", 
                details: [{name:"Backend"}, {name:"Junior"}, {name: "Ruby"}, {name: "RoR"}]},
            {image: 'shortly.svg',name: "Shortly", isNew: false, isFeature: false, title: "Sunior Developer", time: "2w ago", workTime:"Full Time", workPlace: "Worldwide", 
                details: [{name:"Frontend"}, {name:"Senior"}, {name: "HTML"}, {name: "Sass"}, {name: "Javascript"}]}];  
        const listFilters = ref<Filter[]>([])
        const displayedItems = ref<JobDetail[]>(listItems.slice());
        const resolve_img_url = (path:string) => {
            let images = require.context('../common/images/', false, /\.png$|\.svg$/);
            return images("./" + path)
        }
        const getListFilter = (item: Filter[]) => {
            listFilters.value = item.slice();
            updateDisplayedItem();
        }  
        const updateListFilter = (item: Filter) => {
            listFilters.value.push(item);
            updateDisplayedItem()
        }
        const removeListFilter = (detailItem: Filter) => {
           listFilters.value.splice(listFilters.value.indexOf(detailItem), 1);
           updateDisplayedItem()
        } 
        const clearListFilter = () => {
            listFilters.value = [];
            displayedItems.value = listItems.slice();
        }
        const updateDisplayedItem = () => {
            displayedItems.value = listItems.slice();
            listFilters.value.forEach(e => {
                let items = displayedItems.value.filter(i => {
                    let detail =  i.details.filter(d => d.name === e.name);
                    if (detail.length > 0) return true;
                    return false;
                });
                displayedItems.value = items;
            })
        }
        
</script>
<style scoped>
@import './style.css';
</style>
