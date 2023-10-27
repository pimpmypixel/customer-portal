import {formatCurrency} from "@/lib/utils";
import {Rating} from "primereact/rating";
import {Button} from "primereact/button";
import React from "react";

export const codeBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Code</span>
            {rowData.code}
        </>
    )
}

export const nameBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Name</span>
            {rowData.name}
        </>
    )
}

export const imageBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Image</span>
            <img
                src={`/demo/images/sensor/${rowData.image}`}
                alt={rowData.image}
                className="shadow-2"
                width="100"
            />
        </>
    )
}

export const priceBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Price</span>
            {formatCurrency(rowData.price as number)}
        </>
    )
}

export const categoryBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Category</span>
            {rowData.category}
        </>
    )
}

export const ratingBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Reviews</span>
            <Rating
                value={rowData.rating}
                readOnly
                cancel={false}
            />
        </>
    )
}

export const statusBodyTemplate = (rowData: any) => {
    return (
        <>
            <span className="p-column-title">Status</span>
            <span className={`sensor-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>
        </>
    )
}
