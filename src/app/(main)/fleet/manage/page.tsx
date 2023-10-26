/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { FileUpload } from 'primereact/fileupload'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'
import { Rating } from 'primereact/rating'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'
// import { FleetService } from '@/demo/service/FleetService'
import { Demo } from '@/types/demo'
import { formatCurrency } from '@/lib/utils'
import { useApi } from '@/hooks/useApi'
import { ProgressSpinner } from 'primereact/progressspinner'

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const FleetManager = () => {
    let emptySensor: Demo.Sensor = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
    }

    const [sensors, setSensors] = useState(null)
    const [sensorDialog, setSensorDialog] = useState(false)
    const [deleteSensorDialog, setDeleteSensorDialog] = useState(false)
    const [deleteSensorsDialog, setDeleteSensorsDialog] = useState(false)
    const [sensor, setSensor] = useState<Demo.Sensor>(emptySensor)
    const [selectedSensors, setSelectedSensors] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const toast = useRef<Toast>(null)
    const dt = useRef<DataTable<any>>(null)
    const { data, error, isLoading } = useApi({ endpoint: 'fleet' })

    useEffect(() => {
        // FleetService.getFleet().then(data => console.log(data))
        // FleetService.getSensors().then(data => setSensors(data as any))
    }, [])

    // const formatCurrency = (value: number) => {
    //     return value.toLocaleString('en-US', {
    //         style: 'currency',
    //         currency: 'USD',
    //     })
    // }

    const openNew = () => {
        setSensor(emptySensor)
        setSubmitted(false)
        setSensorDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setSensorDialog(false)
    }

    const hideDeleteSensorDialog = () => {
        setDeleteSensorDialog(false)
    }

    const hideDeleteSensorsDialog = () => {
        setDeleteSensorsDialog(false)
    }

    const saveSensor = () => {
        setSubmitted(true)

        if (sensor.name.trim()) {
            let _sensors = [...(sensors as any)]
            let _sensor = { ...sensor }
            if (sensor.id) {
                const index = findIndexById(sensor.id)

                _sensors[index] = _sensor
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Sensor Updated',
                    life: 3000,
                })
            } else {
                _sensor.id = createId()
                _sensor.image = 'sensor-placeholder.svg'
                _sensors.push(_sensor)
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Sensor Created',
                    life: 3000,
                })
            }

            setSensors(_sensors as any)
            setSensorDialog(false)
            setSensor(emptySensor)
        }
    }

    const editSensor = (sensor: Demo.Sensor) => {
        setSensor({ ...sensor })
        setSensorDialog(true)
    }

    const confirmDeleteSensor = (sensor: Demo.Sensor) => {
        setSensor(sensor)
        setDeleteSensorDialog(true)
    }

    const deleteSensor = () => {
        let _sensors = (sensors as any)?.filter((val: any) => val.id !== sensor.id)
        setSensors(_sensors)
        setDeleteSensorDialog(false)
        setSensor(emptySensor)
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Sensor Deleted',
            life: 3000,
        })
    }

    const findIndexById = (id: string) => {
        let index = -1
        for (let i = 0; i < (sensors as any)?.length; i++) {
            if ((sensors as any)[i].id === id) {
                index = i
                break
            }
        }

        return index
    }

    const createId = () => {
        let id = ''
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return id
    }

    const exportCSV = () => {
        dt.current?.exportCSV()
    }

    const confirmDeleteSelected = () => {
        setDeleteSensorsDialog(true)
    }

    const deleteSelectedSensors = () => {
        let _sensors = (sensors as any)?.filter((val: any) => !(selectedSensors as any)?.includes(val))
        setSensors(_sensors)
        setDeleteSensorsDialog(false)
        setSelectedSensors(null)
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Sensors Deleted',
            life: 3000,
        })
    }

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _sensor = { ...sensor }
        _sensor['category'] = e.value
        setSensor(_sensor)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || ''
        let _sensor = { ...sensor }
        _sensor[`${name}`] = val

        setSensor(_sensor)
    }

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0
        let _sensor = { ...sensor }
        _sensor[`${name}`] = val

        setSensor(_sensor)
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        outlined
                        size="small"
                        label="Add sensor"
                        icon="pi pi-plus"
                        severity="success"
                        className="mr-2"
                        onClick={openNew}
                    />
                    <Button
                        outlined
                        size="small"
                        label="Locate"
                        icon="pi pi-map-marker"
                        severity="info"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedSensors || !(selectedSensors as any).length}
                    />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/*<FileUpload
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Import"
                    className="mr-2 inline-block"
                />*/}
                <Button
                    outlined
                    size="small"
                    label="Export"
                    icon="pi pi-upload"
                    severity="help"
                    onClick={exportCSV}
                />
            </React.Fragment>
        )
    }

    const codeBodyTemplate = (rowData: Demo.Sensor) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        )
    }

    const nameBodyTemplate = (rowData: Demo.Sensor) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        )
    }

    const imageBodyTemplate = (rowData: Demo.Sensor) => {
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

    const priceBodyTemplate = (rowData: Demo.Sensor) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price as number)}
            </>
        )
    }

    const categoryBodyTemplate = (rowData: Demo.Sensor) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        )
    }

    const ratingBodyTemplate = (rowData: Demo.Sensor) => {
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

    const statusBodyTemplate = (rowData: Demo.Sensor) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`sensor-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData: Demo.Sensor) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    severity="success"
                    className="mr-2"
                    onClick={() => editSensor(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="warning"
                    onClick={() => confirmDeleteSensor(rowData)}
                />
            </>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Sensors</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={e => setGlobalFilter(e.currentTarget.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    )

    const sensorDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                text
                onClick={saveSensor}
            />
        </>
    )
    const deleteSensorDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteSensorDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSensor}
            />
        </>
    )
    const deleteSensorsDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteSensorsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedSensors}
            />
        </>
    )

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    {isLoading ? (
                        <div className={'flex items-center'}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <>
                            <Toast ref={toast} />
                            <Toolbar
                                className="mb-4"
                                left={leftToolbarTemplate}
                                right={rightToolbarTemplate}></Toolbar>

                            <DataTable
                                size="small"
                                ref={dt}
                                value={sensors}
                                selection={selectedSensors}
                                onSelectionChange={e => setSelectedSensors(e.value as any)}
                                dataKey="id"
                                paginator
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25]}
                                className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} sensors"
                                globalFilter={globalFilter}
                                emptyMessage="No sensors found."
                                header={header}
                                responsiveLayout="scroll">
                                <Column
                                    selectionMode="multiple"
                                    headerStyle={{ width: '4rem' }}></Column>
                                <Column
                                    field="code"
                                    header="Code"
                                    sortable
                                    body={codeBodyTemplate}
                                    headerStyle={{ minWidth: '15rem' }}></Column>
                                <Column
                                    field="name"
                                    header="Name"
                                    sortable
                                    body={nameBodyTemplate}
                                    headerStyle={{ minWidth: '15rem' }}></Column>
                                <Column
                                    field="rating"
                                    header="Reviews"
                                    body={ratingBodyTemplate}
                                    sortable></Column>
                                <Column
                                    field="inventoryStatus"
                                    header="Status"
                                    body={statusBodyTemplate}
                                    sortable
                                    headerStyle={{ minWidth: '10rem' }}></Column>
                                <Column
                                    body={actionBodyTemplate}
                                    headerStyle={{ minWidth: '10rem' }}></Column>
                            </DataTable>

                            <Dialog
                                visible={sensorDialog}
                                style={{ width: '450px' }}
                                header="Sensor Details"
                                modal
                                className="p-fluid"
                                footer={sensorDialogFooter}
                                onHide={hideDialog}>
                                {sensor.image && (
                                    <img
                                        src={`/demo/images/sensor/${sensor.image}`}
                                        alt={sensor.image}
                                        width="150"
                                        className="mt-0 mx-auto mb-5 block shadow-2"
                                    />
                                )}
                                <div className="field">
                                    <label htmlFor="name">Name</label>
                                    <InputText
                                        id="name"
                                        value={sensor.name}
                                        onChange={e => onInputChange(e, 'name')}
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !sensor.name,
                                        })}
                                    />
                                    {submitted && !sensor.name && <small className="p-invalid">Name is required.</small>}
                                </div>
                                <div className="field">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea
                                        id="description"
                                        value={sensor.description}
                                        onChange={e => onInputChange(e, 'description')}
                                        required
                                        rows={3}
                                        cols={20}
                                    />
                                </div>

                                <div className="field">
                                    <label className="mb-3">Category</label>
                                    <div className="formgrid grid">
                                        <div className="field-radiobutton col-6">
                                            <RadioButton
                                                inputId="category1"
                                                name="category"
                                                value="Accessories"
                                                onChange={onCategoryChange}
                                                checked={sensor.category === 'Accessories'}
                                            />
                                            <label htmlFor="category1">Accessories</label>
                                        </div>
                                        <div className="field-radiobutton col-6">
                                            <RadioButton
                                                inputId="category2"
                                                name="category"
                                                value="Clothing"
                                                onChange={onCategoryChange}
                                                checked={sensor.category === 'Clothing'}
                                            />
                                            <label htmlFor="category2">Clothing</label>
                                        </div>
                                        <div className="field-radiobutton col-6">
                                            <RadioButton
                                                inputId="category3"
                                                name="category"
                                                value="Electronics"
                                                onChange={onCategoryChange}
                                                checked={sensor.category === 'Electronics'}
                                            />
                                            <label htmlFor="category3">Electronics</label>
                                        </div>
                                        <div className="field-radiobutton col-6">
                                            <RadioButton
                                                inputId="category4"
                                                name="category"
                                                value="Fitness"
                                                onChange={onCategoryChange}
                                                checked={sensor.category === 'Fitness'}
                                            />
                                            <label htmlFor="category4">Fitness</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="price">Price</label>
                                        <InputNumber
                                            id="price"
                                            value={sensor.price}
                                            onValueChange={e => onInputNumberChange(e, 'price')}
                                            mode="currency"
                                            currency="USD"
                                            locale="en-US"
                                        />
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="quantity">Quantity</label>
                                        <InputNumber
                                            id="quantity"
                                            value={sensor.quantity}
                                            onValueChange={e => onInputNumberChange(e, 'quantity')}
                                        />
                                    </div>
                                </div>
                            </Dialog>

                            <Dialog
                                visible={deleteSensorDialog}
                                style={{ width: '450px' }}
                                header="Confirm"
                                modal
                                footer={deleteSensorDialogFooter}
                                onHide={hideDeleteSensorDialog}>
                                <div className="flex align-items-center justify-content-center">
                                    <i
                                        className="pi pi-exclamation-triangle mr-3"
                                        style={{ fontSize: '2rem' }}
                                    />
                                    {sensor && (
                                        <span>
                                            Are you sure you want to delete <b>{sensor.name}</b>?
                                        </span>
                                    )}
                                </div>
                            </Dialog>

                            <Dialog
                                visible={deleteSensorsDialog}
                                style={{ width: '450px' }}
                                header="Confirm"
                                modal
                                footer={deleteSensorsDialogFooter}
                                onHide={hideDeleteSensorsDialog}>
                                <div className="flex align-items-center justify-content-center">
                                    <i
                                        className="pi pi-exclamation-triangle mr-3"
                                        style={{ fontSize: '2rem' }}
                                    />
                                    {sensor && <span>Are you sure you want to delete the selected sensors?</span>}
                                </div>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FleetManager
