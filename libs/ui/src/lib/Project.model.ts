export class ProjectModel {
    id!:string;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    priority: string; 
    order: number;
    constructor(title:string,description:string,priority:string,order:number,createdAt?: string,
        updatedAt?: string){
        this.title=title;this.description=description;this.priority=priority;this.order=order;
        
    }
  }