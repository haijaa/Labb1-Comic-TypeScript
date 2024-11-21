export interface getMagazines {
    title: string,
    description: string,
    image: string, 
    character: string,
    publisher_name: string,
    id: number
}

export interface postMagazine {
    title: string,
    description: string,
    image: string, 
    character: string,
    publisherid: number
}

export interface publisher {
    name: string,
    id: number
}