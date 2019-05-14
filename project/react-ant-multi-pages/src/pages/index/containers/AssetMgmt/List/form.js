import moment from 'moment'
import React from 'react'
import { Input, DatePicker, Button, Form, Select } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import { mapMoment } from 'ROOT_SOURCE/utils/fieldFormatter'
import DateRangePicker from 'ROOT_SOURCE/components/DateRangePicker'


const { MonthPicker, RangePicker } = DatePicker
const FormItem = Form.Item


export default class extends BaseContainer {
    
    
    componentDidMount() {
        if (this.props.history.action === 'PUSH') {
            this.submitForm(null, true)
        }
    }
    
    
    /**
     * 提交表单
     */
    submitForm = async (e, useFormDataInStore) => {
        e && e.preventDefault && e.preventDefault()
        
        // 重置table
        this.props.resetTable && this.props.resetTable()
        
        // 提交表单最好新一个事务，不受其他事务影响
        await this.sleep()
        
        let _formData;
        
        if (useFormDataInStore) {
            _formData = this.props.formData
        } else {
            _formData = { ...this.props.form.getFieldsValue() }
            // _formData里的一些值需要适配
            _formData = mapMoment(_formData, 'YYYY-MM-DD HH:mm:ss')
        }
            
        // action
        this.props.updateTable && this.props.updateTable(_formData)
    }
    
    
    
    render() {
        let { form, formData } = this.props
        let { getFieldDecorator } = form
        let { assetCode, assetName, contract, startDate, endDate } = formData
        
        
        return (
            
            <div className="ui-background">
                <Form layout="inline" onSubmit={this.submitForm}>
           
                    <FormItem label={('资产方编号')}>
                        {getFieldDecorator('assetCode', {initialValue: assetCode||''})(<Input />)}
                    </FormItem>
        
                    <FormItem label={('资产方名称')}>
                        {getFieldDecorator('assetName', {initialValue: assetName||''})(<Input />)}
                    </FormItem>
        
                    <FormItem label={('签约主体')}>
                        {getFieldDecorator('contract', {initialValue: contract||''})(<Input />)}
                    </FormItem>
                    
                    
                    <FormItem label={('签约时间')}>
                        <DateRangePicker
                            dateShowFormat='YYYY年MM月DD HH:mm:ss'
                            form={form}
                            startVal={startDate}
                            startKey='startDate'
                            endVal={endDate}
                            endKey='endDate'
                        />
                    </FormItem>
                    
                    
                    <FormItem>
                        <Button type="primary" htmlType="submit"> 查询 </Button>
                    </FormItem>
            
                </Form>
            </div>
            
        )
    }
}

