export interface JobDetail{
    name: string,
    image: string,
    isNew: boolean,
    isFeature: boolean,
    title: string,
    time: string,
    workTime: string, 
    workPlace: string,
    details: Filter[]
}
export interface Filter{
    name: string
}