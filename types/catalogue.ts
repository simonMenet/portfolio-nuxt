export interface Artwork{id:string;title:string;seriesId?:string;year:number;technique:string;dimensions:string;images:{vue_principale:string;vue_detail?:string;vue_situation?:string};status:'available'|'reserved'|'private_collection'}
export interface Series{id:string;title:string;year:number;statement:string;artworkIds:string[]}
