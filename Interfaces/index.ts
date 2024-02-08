import { SvgIconComponent } from "@mui/icons-material"
import { SelectChangeEvent } from "@mui/material"
import { ReactElement } from "react"

export interface ILoginProps {
  username: string
  password: string
}

export interface ILoginSectionProps {
  loading?: boolean
  formData: ILoginProps
  handleLogin: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IMiniVariantDrawerProps {
  children: React.ReactNode
  name?: string
  role?: string
  handleLogoutDialogOpen: () => void
}

export interface IDrawerMenu {
  text: string
  href: string
  icon: SvgIconComponent
  onClick?: () => void
}

export type DialogContent = 'particulars' | 'discounts' | 'signatories' | 'paper_sizes' | 'print_official_receipt' 

export interface ISystemDialogProps {
  open: boolean
  title: string
  dialogType: 'logout' | 'create' | 'update' | 'delete' | 'print'
  content?:DialogContent
  formData?: ILoginProps | IParticular | IDiscount | IPaperSize
  printUrl?: string
  handleClose: () => void
  handleLogout?: () => void
  handleCreate?: (formData: any) => void
  handleUpdate?: (formData: any) => void
  handleDelete?: (id: string) => void
  handleClear?: () => void
  handleInputChange?: any
}

export interface ICreateContentProps {
  content: DialogContent
  formData: any
  handleInputChange: any
}

export interface IPrintContentProps {
  printUrl: string
}

export interface IParticularsSubContentProps {
  formData: IParticular
  handleInputChange: (input_name: string, value: string | number | null) => void
}

export interface IDiscountsSubContentProps {
  formData: IDiscount
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type OpenDialogType = 'logout' | 'create_particulars' | 'create_discounts' | 'print'
export interface IOpenDialog {
  logout?: boolean
  create_particulars?: boolean
  create_discounts?: boolean
  print?: boolean
}

export interface ICardContainerProps {
  title?: string
  children?: React.ReactNode
}

export interface IPayor {
  id?: string
  payor_name: string
}

export interface IDiscount {
  id?: string
  discount_name?: string
  percent?: number
}

export interface ICategories {
  id?: string
  category_name?: string
}

export interface IParticular {
  id?: string
  particular_name?: string
  category_id?: string
}

export interface IOfficialReceipt {
  id?: string
  accountable_personnel_id?: string
  receipt_date?: string
  deposited_date?: string
  cancelled_date?: string
  or_no?: string
  payor_id?: string
  nature_collection_id?: string
  amount?: number
  discount_id?: string
  deposit?: number
  amount_words?: string
  card_no?: string
  payment_mode?: 'cash' | 'check' | 'money_order'
  is_cancelled?: boolean
}

export interface IPaperSize {
  id?: string
  paper_name: string
  width: number
  height: number
}

export interface IOfficialReceiptProps {
  payors?: IPayor[]
  particulars?: IParticular[]
  orList?: IOfficialReceipt[]
}

export interface ITabContents {
  label: string
  index: number
}

export interface ITabContainerProps {
  tabs?: ITabContents[]
  children?: React.ReactNode
  currentTab?: number
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void
}

export interface ITabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export interface ICreateOrProps {
  personelName: string
  payors: IPayor[]
  particulars: IParticular[]
  discounts: IDiscount[]
  formData: IOfficialReceipt
  handleCreate: (formData: IOfficialReceipt, print: boolean) => void
  handleInputChange: (input_name: string, value: string | number | null) => void
  handlePrint: (orId: string, paperSizeId: string) => void
  handleClear: () => void
  handleResync: () => void
  handleDialogOpen: (dialogType: OpenDialogType) => void
}

export interface ICreateOrActionButtonsProps {
  formData: IOfficialReceipt
  handleCreate: (formData: IOfficialReceipt, print: boolean) => void
  handlePrint: (orId: string, paperSizeId: string) => void
  handleClear: () => void
}

export interface ICreateOrFieldsProps {
  personelName: string
  payors: IPayor[]
  particulars: IParticular[]
  discounts: IDiscount[]
  formData: IOfficialReceipt
  handleInputChange: (input_name: string, value: string | number | null) => void
  handleDialogOpen: (dialogType: OpenDialogType) => void
}