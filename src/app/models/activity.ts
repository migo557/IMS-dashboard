export interface ActivityInterface {
    id: number;
    projectId: number;
    // projectTitle: string;
    userId: number;
    description: string;
    logs: string;
    date: Date;
}

export class Activity implements ActivityInterface {
    id: number;
    projectId: number;
    //projectTitle: string;
    userId: number;
    description: string;
    logs: string;
    date: Date;

    constructor(id: number, projectId: number, userId: number,
                description: string = null, date=null, logs=null) {
        this.id = id;
        this.projectId = projectId;
        // this.projectTitle = projectTitle;
        this.userId = userId;
        this.description = description;
        this.date = date;
        this.logs = logs;
    }
}
