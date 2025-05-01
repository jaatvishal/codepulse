
export interface addBlogPost{
    title:string;
    shortdescription:string;
    content:string;
    featuredImageUrl:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
    categories:string[];
}