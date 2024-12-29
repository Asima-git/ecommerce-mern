import { Input } from "@/components/ui/input"
import React from 'react'
import { Label } from "../ui/label"
import { Select,SelectContent,SelectItem ,SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

const CommonForm = ({formControls,formData,setFormData,onSubmit,buttonText,isBtnDisable}) => {
  const renderInput = (getControlItem)=>{
   let element = null
   const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
        case 'input':
            element = <Input name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value} onChange={event => setFormData({
              ...formData,[getControlItem.name] : event.target.value
            })}/>
        break;
        case 'select':
            element = <Select value={value} onValueChange={(value)=>setFormData({
              ...formData,
              [getControlItem.name]:value
            })}>
                <SelectTrigger>
                   <SelectValue placeholder={getControlItem.label}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {
                    getControlItem.options && 
                    getControlItem.options.length > 0 ?
                    getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label} 
                    </SelectItem>) : null
                  }
                </SelectContent>
            </Select>
        break;
        case 'textarea':
            element = <Textarea name={getControlItem.name} placeholder={getControlItem.placeholder}
             id={getControlItem.id} value={value}
             onChange={event => setFormData({
              ...formData,[getControlItem.name] : event.target.value
            })}
            />
        break;
        default:
            element = <Input name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value} onChange={event => setFormData({
              ...formData,[getControlItem.name] : event.target.value
            })}
            />
            break;
    }
    return element
    }
  return (
    <>
      <form onSubmit={onSubmit}>
         <div className="flex flex-col gap-3">
            {
                formControls.map(controlItem => <div className='grid w-full gap-1.5' key={controlItem.name}>
                   <Label className='mb-1'>{controlItem.label}</Label>
                   {renderInput(controlItem)}
                </div>)
            }
         </div>
         <Button className='mt-2 w-full' disable={isBtnDisable}>{buttonText || 'Submit'}</Button>
      </form>
    </>
  )
}

export default CommonForm
