export class TaskRequest {
    userId: string;
    taskName: string;
    description: string;
    userRole: string;
    dueDate: Date;
    startDate: Date;
    // status: string;
    
  
    constructor(userId: string, taskName: string, description: string, userRole: string,dueDate: Date,startDate: Date) {
      this.userId = userId;
      this.taskName = taskName;
      this.description = description;
      this.userRole = userRole;
      this.dueDate = dueDate;
      this.startDate = startDate
    //   this.status = status;
    }
  }


  export class UpdateTaskRequest {
    userId: string;
    taskId: string;
    taskName:string;
    description: string;
    dueDate: string; 
    userRole: string;

    constructor(userId: string, taskId: string, description: string,taskName:string,dueDate: string ,userRole: string) {
        this.userId = userId;
        this.taskId = taskId;
        this.taskName =taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.userRole = userRole;
      }
  }