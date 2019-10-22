export interface submitPostSchema {
    user_id: string,
    complete_flag: boolean, // change to true when last path is being submitted
    file_name: string,
    qid: number,
    results: object
}