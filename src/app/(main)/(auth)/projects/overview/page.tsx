/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { useFormatter } from 'next-intl'
import React, { useEffect, useRef, useState, FormEventHandler } from 'react'
import { Models } from '@/types/types'
import { useApi } from '@/hooks/useApi'
import { MultiSelect } from 'primereact/multiselect'
// import { MdEditor } from 'md-editor-rt'
import axios, { csrf } from '@/lib/axios'
import 'md-editor-rt/lib/style.css'
import { ProgressSpinner } from 'primereact/progressspinner'
import styles from './index.module.scss'

interface InputValue {
    name: string
    code: string
}

interface DropdownItem {
    name: string
    code: string
}

const News = () => {
    let emptyNewsItem: Models.News = {
        id: '',
        editor: '',
        title: '',
        url: '',
        content: '',
        image: '',
        slug: '',
        tags: [],
    }

    const multiselectValues: InputValue[] = [
        { name: 'Entomology', code: 'Entomology' },
        { name: 'Economy', code: 'Economy' },
        { name: 'SDG15', code: 'SDG15' },
        { name: 'MRV', code: 'MRV' },
        { name: 'Technology', code: 'Technology' },
        { name: 'Reporting', code: 'Reporting' },
    ]

    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
        },
    ]

    const format = useFormatter()
    const [newsList, setNewsList] = useState(null)
    const [newsItemDialog, setNewsItemDialog] = useState(false)
    const [deleteNewsItemDialog, setDeleteNewsItemDialog] = useState(false)
    const [deleteNewsItemsDialog, setDeleteNewsItemsDialog] = useState(false)
    const [NewsItem, setNewsItem] = useState<Models.NewsItem>(emptyNewsItem)
    const [selectedNewsItems, setSelectedNewsItems] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const toast = useRef<Toast>(null)
    const dt = useRef<DataTable<any>>(null)
    const { data, isLoading } = useApi({ endpoint: 'news' })

    const [multiselectValue, setMultiselectValue] = useState(null)
    // const [status, setStatus] = useState('')
    // const [title, setTitle] = useState('')
    // const [url, setUrl] = useState('')
    // const [imageUrl, setImageUrl] = useState('')
    // const [tags, setTags] = useState([])
    // const [text, setText] = useState('# Fresh news2 in the biodiversity space')

    const now = new Date()

    useEffect(() => {
        setNewsList(data as any)
    }, [data])

    const setContent = (content: any) => {
        setNewsItem({ ...NewsItem, content })
    }
    const itemTemplate = (option: DropdownItem) => {
        return (
            <div className="flex align-items-center">
                <span className="ml-2">{option.name}</span>
            </div>
        )
    }

    const openNew = () => {
        setNewsItem(emptyNewsItem)
        setSubmitted(false)
        setNewsItemDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setNewsItemDialog(false)
    }

    const hideDeleteNewsItemDialog = () => {
        setDeleteNewsItemDialog(false)
    }

    const hideDeleteNewsItemsDialog = () => {
        setDeleteNewsItemsDialog(false)
    }

    const saveNewsItem = () => {
        setSubmitted(true)
        csrf()

        if (NewsItem.title.trim()) {
            let _newslist = [...(newsList as any)]
            let _newsitem = { ...NewsItem }
            console.log(_newsitem)

            axios
                .post('http://localhost/api/news', { data: _newsitem })
                .then((response: { data: { status: React.SetStateAction<string> } }) => {
                    console.log(response.data.status)
                    // setStatus(response.data.status)
                    if (NewsItem.id) {
                        const index = findIndexById(NewsItem.id)

                        _newslist[index] = _newsitem
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'NewsItem Updated',
                            life: 3000,
                        })
                    } else {
                        // _newsitem.id = createId()
                        // _newsitem.image = 'newsitem-placeholder.svg'
                        // console.log(typeof _newslist)
                        _newslist.push(_newsitem)
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'NewsItem Created',
                            life: 3000,
                        })
                    }

                    setNewsList(_newslist as any)
                    setNewsItemDialog(false)
                    setNewsItem(emptyNewsItem)
                })
                .catch((error: { response: { status: number; data: { errors: any } } }) => {
                    if (error.response.status !== 422) throw error
                    // setErrors(error.response.data.errors)
                    console.log(error.response.data.errors)
                })
        }
    }

    const editNewsItem = (newsitem: Models.NewsItem) => {
        setNewsItem({ ...newsitem })
        setNewsItemDialog(true)
    }

    const confirmDeleteNewsItem = (newsitem: Models.NewsItem) => {
        setNewsItem(newsitem)
        setDeleteNewsItemDialog(true)
    }

    const deleteNewsItem = () => {
        axios
            .delete('http://localhost/api/news', { data: { ids: [NewsItem.id] } })
            .then((response: { data: { status: React.SetStateAction<string> } }) => {
                let _newslist = (newsList as any)?.filter((val: any) => val.id !== NewsItem.id)
                setNewsList(_newslist)
                setDeleteNewsItemDialog(false)
                setNewsItem(emptyNewsItem)
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'News Item Deleted',
                    life: 3000,
                })
            })
            .catch((error: { response: { status: number; data: { errors: any } } }) => {
                if (error.response.status !== 422) throw error
                // setErrors(error.response.data.errors)
                console.log(error.response.data.errors)
            })
    }

    const findIndexById = (id: string) => {
        let index = -1
        for (let i = 0; i < (newsList as any)?.length; i++) {
            if ((newsList as any)[i].id === id) {
                index = i
                break
            }
        }

        return index
    }

    const confirmDeleteSelected = () => {
        setDeleteNewsItemsDialog(true)
    }

    const deleteSelectedNewsItems = () => {
        console.log(selectedNewsItems)
        // let _newslist = (newsList as any)?.filter((val: any) => !(selectedNewsItems as any)?.includes(val))
        // setNewsList(_newslist)
        // setDeleteNewsItemsDialog(false)
        // setSelectedNewsItems(null)
        // toast.current?.show({
        //     severity: 'success',
        //     summary: 'Successful',
        //     detail: 'NewsItems Deleted',
        //     life: 3000,
        // })
    }

    const actionBodyTemplate = (rowData: Models.NewsItem) => {
        return (
            <>
                <Button
                    // outlined
                    icon="pi pi-pencil"
                    rounded
                    severity="success"
                    className="mr-2"
                    onClick={() => editNewsItem(rowData)}
                />
                <Button
                    // outlined
                    icon="pi pi-trash"
                    rounded
                    severity="warning"
                    onClick={() => confirmDeleteNewsItem(rowData)}
                />
            </>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Projects</h5>
            <div className="p-inputgroup flex w-20rem ">
                <Button
                    // className="bg-white"
                    // outlined
                    // label="New"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
                <Button
                    // outlined={!selectedNewsItems || !(selectedNewsItems as any).length}
                    // className={!selectedNewsItems || !(selectedNewsItems as any) ? 'bg-white' : ''}
                    // label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedNewsItems || !(selectedNewsItems as any).length}
                />
                <InputText
                    type="search"
                    onInput={e => setGlobalFilter(e.currentTarget.value)}
                    placeholder="Search..."
                />
            </div>
        </div>
    )

    const newsitemDialogFooter = (
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
                onClick={saveNewsItem}
            />
        </>
    )
    const deleteNewsItemDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteNewsItemDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteNewsItem}
            />
        </>
    )
    const deleteNewsItemsDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteNewsItemsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={deleteSelectedNewsItems}
            />
        </>
    )

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    {isLoading ? (
                        <div className={'flex items-center'}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <>
                            <DataTable
                                rows={10}
                                ref={dt}
                                value={newsList}
                                selection={selectedNewsItems}
                                onSelectionChange={e => setSelectedNewsItems(e.value as any)}
                                dataKey="id"
                                paginator
                                rowsPerPageOptions={[5, 10, 25]}
                                className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} newsitems"
                                globalFilter={globalFilter}
                                emptyMessage="No news items found."
                                header={header}
                                responsiveLayout="scroll">
                                <Column
                                    selectionMode="multiple"
                                    headerStyle={{ width: '4rem' }}></Column>
                                <Column
                                    field="title"
                                    header="Title"
                                    sortable
                                    // body={nameBodyTemplate}
                                    headerStyle={{ minWidth: '15rem' }}></Column>
                                <Column
                                    // field="editor"
                                    header="Editor"
                                    sortable
                                    body={rowData => rowData.editor.firstname + ' ' + rowData.editor.lastname}
                                    // body={codeBodyTemplate}
                                    headerStyle={{ minWidth: '7rem' }}></Column>
                                <Column
                                    field="url"
                                    header="Url"
                                    body={() => <>LINK</>}></Column>
                                <Column
                                    field="created_at"
                                    header="Created"
                                    sortable
                                    body={row => format.relativeTime(new Date(row.created_at), now)}
                                    headerStyle={{ minWidth: '5rem' }}></Column>
                                <Column
                                    // field="updated_at"
                                    header="Updated"
                                    sortable
                                    body={row => format.relativeTime(new Date(row.updated_at), now)}
                                    headerStyle={{ minWidth: '5rem' }}></Column>
                                <Column
                                    body={actionBodyTemplate}
                                    headerStyle={{ minWidth: '10rem' }}></Column>
                            </DataTable>
                        </>
                    )}

                    <Dialog
                        visible={newsItemDialog}
                        style={{ width: '60%' }}
                        header={() => (
                            <>
                                News Item Details
                                <br />
                                <small className="font-light text-xs">{NewsItem.slug}</small>
                            </>
                        )}
                        modal
                        className="p-fluid"
                        footer={newsitemDialogFooter}
                        onHide={hideDialog}>
                        {/*{NewsItem.image && (
                            <img
                                src={`/demo/images/newsitem/${NewsItem.image}`}
                                alt={NewsItem.image}
                                width="150"
                                className="mt-0 mx-auto mb-5 block shadow-2"
                            />
                        )}*/}

                        <div className="field grid">
                            <label
                                htmlFor="title"
                                className="col-12 mb-2 md:col-2 md:mb-0 font-bold">
                                Title
                            </label>
                            <div className="col-12 md:col-10">
                                <InputText
                                    value={NewsItem.title}
                                    id="title"
                                    onChange={e => {
                                        setNewsItem({ ...NewsItem, title: e.target.value })
                                    }}
                                    type="text"
                                />
                                <small>Use a catchy phrase aligned with our culture and tone of voice.</small>
                            </div>
                        </div>
                        <div className="field grid">
                            <label
                                htmlFor="url"
                                className="col-12 mb-2 md:col-2 md:mb-0 font-bold">
                                URL
                            </label>
                            <div className="col-12 md:col-10">
                                <InputText
                                    value={NewsItem.url}
                                    onChange={e => {
                                        setNewsItem({ ...NewsItem, url: e.target.value })
                                    }}
                                    id="url"
                                    type="text"
                                />
                                <small>Link to external article.</small>
                            </div>
                        </div>
                        <div className="field grid">
                            <label
                                htmlFor="image_url"
                                className="col-12 mb-2 md:col-2 md:mb-0 font-bold">
                                Image URL
                            </label>
                            <div className="col-12 md:col-10">
                                <InputText
                                    value={NewsItem.image}
                                    onChange={e => {
                                        setNewsItem({ ...NewsItem, image: e.target.value })
                                    }}
                                    id="image_url"
                                    type="text"
                                />
                                <small>Add primary image</small>
                            </div>
                        </div>
                        <div className="field grid">
                            <label
                                htmlFor="content"
                                className="col-12 mb-2 md:col-2 md:mb-0 font-bold">
                                Tags
                            </label>
                            <div className="col-12 md:col-10">
                                <MultiSelect
                                    id="content"
                                    // value={multiselectValue}
                                    // onChange={e => setMultiselectValue(e.value)}
                                    value={NewsItem.tags}
                                    onChange={e => {
                                        setNewsItem({ ...NewsItem, tags: e.target.value })
                                    }}
                                    options={multiselectValues}
                                    itemTemplate={itemTemplate}
                                    optionLabel="name"
                                    placeholder="Select tags"
                                    filter
                                    className="multiselect-custom"
                                    display="chip"
                                />
                                <small>Categorize the post with tags</small>
                            </div>
                        </div>
                        <div className="field grid">
                            <label
                                htmlFor="email3"
                                className="col-12 mb-2 md:col-2 md:mb-0 font-bold">
                                Body
                            </label>
                            <div className="col-12 md:col-10">
                                <InputTextarea
                                    value={NewsItem.content}
                                    placeholder="Your Message"
                                    onChange={e => {
                                        setNewsItem({ ...NewsItem, content: e.target.value })
                                    }}
                                    rows={8}
                                    cols={30}
                                />
                                {/*<MdEditor
                                    toolbars={['bold', 'underline', 'title', 'italic', 'quote', 'unorderedList', 'orderedList', 'link', 'image', 'table']}
                                    language={'en-US'}
                                    modelValue={NewsItem.content}
                                    onChange={setContent}
                                />*/}
                                <small>Write your engaging content.</small>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteNewsItemDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteNewsItemDialogFooter}
                        onHide={hideDeleteNewsItemDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: '2rem' }}
                            />
                            {NewsItem && (
                                <span>
                                    Are you sure you want to delete <b>{NewsItem.title}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteNewsItemsDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteNewsItemsDialogFooter}
                        onHide={hideDeleteNewsItemsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: '2rem' }}
                            />
                            {NewsItem && <span>Are you sure you want to delete the selected News Items?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default News

// export async function generateStaticParams() {
//     return [
//         {
//             slug: 'blog',
//         },
//     ]
// }
