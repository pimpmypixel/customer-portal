'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Menu from '../page'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'

interface DropdownItem {
    name: string
    code: string
}

function SeatDemo() {
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null)
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Option 1', code: 'Option 1' },
            { name: 'Option 2', code: 'Option 2' },
            { name: 'Option 3', code: 'Option 3' },
        ],
        [],
    )

    useEffect(() => {
        setDropdownItem(dropdownItems[0])
    }, [dropdownItems])

    return (
        <Menu>
            <div className="card py-5 mt-6">
                <h5>Define use case</h5>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="firstname2">Firstname</label>
                        <InputText
                            id="firstname2"
                            type="text"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="lastname2">Lastname</label>
                        <InputText
                            id="lastname2"
                            type="text"
                        />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea
                            id="address"
                            rows={4}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="city">City</label>
                        <InputText
                            id="city"
                            type="text"
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="state">State</label>
                        <Dropdown
                            id="state"
                            value={dropdownItem}
                            onChange={e => setDropdownItem(e.value)}
                            options={dropdownItems}
                            optionLabel="name"
                            placeholder="Select One"></Dropdown>
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="zip">Zip</label>
                        <InputText
                            id="zip"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </Menu>
    )
}

export default SeatDemo
