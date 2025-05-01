export type TaskStatus = "0" | "1" | "2" | "3" | "4" | "5" | "6" ;

export type TaskStatusInfo={
    label:string,
    description:string,
    color:string,
}

export const TaskStatusConfig:{[key in TaskStatus]:TaskStatusInfo}={
    "0":{
        label:"提案",
        description:"提案",
        color:"#000000",
    },
    "1":{
        label:"未着手",
        description:"未着手",
        color:"#000000",
    },
    "2":{
        label:"進行中",
        description:"進行中",   
        color:"#000000",
    },
    "3":{
        label:"完了",
        description:"完了",
        color:"#000000",
    },
    "4":{
        label:"延期",
        description:"延期",
        color:"#000000",
    },
    "5":{
        label:"キャンセル",
        description:"キャンセル",
        color:"#000000",
    },
    "6":{
        label:"無視",
        description:"無視",
        color:"#000000",
    },
}