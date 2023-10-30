declare namespace Models {
    type News = {
        id?: string;
        editor?: string;
        title?: string;
        url?: string;
        content?: string;
        image?: number;
        slug?: string;
        tags?: [string];
        // [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
    };

}