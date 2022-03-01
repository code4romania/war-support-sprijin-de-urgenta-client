import clsx from 'clsx'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Checkbox from '@/components/Form/Checkbox'
import Date from '@/components/Form/Date'
import Number from '@/components/Form/Number'
import Textarea from '@/components/Form/Textarea'
import Dropdown from '@/components/Form/Dropdown'
import SignUpResources from '@/components/SignUpResources'

const FormElements: NextPage = () => {
  const { t } = useTranslation()
  return (
    <main className={clsx('layout h-full')}>
      <Input
        type="text"
        name="normalText"
        label="Normal text"
        placeholder="Normal text"
        value="Normal field"
      />

      <Input
        type="text"
        name="normalTextWithError"
        label="Normal text with error"
        placeholder="Normal text with error"
        value="Invalid field"
        errors={{ message: 'Error message' }}
      />

      <Input
        type="password"
        name="passwordField"
        label="Password field"
        value="password"
      />

      <Date name="date" label="Date input" />
      <Date
        name="date"
        label="Date input with error"
        errors={{ message: 'Error' }}
      />

      <Number name="number" label="Number input" />
      <Number
        name="number"
        label="Number input with error"
        errors={{ message: 'Error' }}
      />

      <h3>Radio Elements</h3>
      <Radio name="radio_option" value="option_a">
        Option A
      </Radio>
      <Radio name="radio_option" value="option_b">
        Option B
      </Radio>
      <Radio name="radio_option" value="option_c">
        Option C
      </Radio>

      <h3>Checkbox elements</h3>
      <Checkbox name="checkbox_option" value="option_1">
        Option 1
      </Checkbox>
      <Checkbox name="checkbox_option" value="option_2">
        Option 2
      </Checkbox>
      <Checkbox name="checkbox_option" value="option_3">
        Option 3
      </Checkbox>

      <Textarea name="textarea" label="Textarea" />
      <Textarea
        name="textarea"
        label="Textarea with error"
        errors={{ message: 'Error' }}
      />

      <Dropdown name="dropdown" label="Dropdown">
        <option>Value X</option>
        <option>Value Y</option>
        <option>Value Z</option>
      </Dropdown>

      <Dropdown
        name="dropdown"
        label="Dropdown with errors"
        errors={{ message: 'Error' }}
      >
        <option>Value X</option>
        <option>Value Y</option>
        <option>Value Z</option>
      </Dropdown>
      <SignUpResources></SignUpResources>
    </main>
  )
}

export default FormElements
