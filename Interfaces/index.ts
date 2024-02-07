import { SvgIconComponent } from "@mui/icons-material"
import { ReactElement } from "react"

export interface ILoginProps {
  username: string
  password: string
}

export interface ILoginSectionProps {
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

export interface ISystemDialogProps {
  open: boolean
  title: string
  dialogType: 'logout' | 'create' | 'update' | 'delete'
  formData?: ILoginProps
  handleClose: () => void
  handleLogout?: () => void
  handleCreate?: (formData: any) => void
  handleUpdate?: (formData: any) => void
  handleDelete?: (id: string) => void
}

export interface IOpenDialog {
  logout?: boolean
  create?: boolean
  update?: boolean
  delete?: boolean
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
  discount_name: string
  percent: number
}

export interface IParticular {
  id?: string
  particular_name: string
  category_id: string
}

export interface IOfficialReceipt {
  id?: string
  accountable_personnel_id: string
  receipt_date: string
  deposited_date?: string
  cancelled_date?: string
  or_no: string
  payor_id: string
  nature_collection_id: string
  amount: number
  discount_id?: string
  deposit: number
  amount_words: string
  card_no?: string
  payment_mode: string
  is_cancelled: boolean
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
  component?: React.ReactNode
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
  payors: IPayor[]
  particulars: IParticular[]
  discounts: IDiscount[]
  paperSizes: IPaperSize[]
  formData: IOfficialReceipt
  handleCreate: (formData: IOfficialReceipt, print: boolean) => void
  handleInputChange: (input_name: string, value: string | number | null) => void
  handlePrint: (orId: string, paperSizeId: string) => void
  handleClear: () => void
  handlePaperSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ICreateOrActionButtonsProps {
  formData: IOfficialReceipt
  paperSizes: IPaperSize[]
  handleCreate: (formData: IOfficialReceipt, print: boolean) => void
  handlePrint: (orId: string, paperSizeId: string) => void
  handleClear: () => void
  handlePaperSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ICreateOrFieldsProps {
  payors: IPayor[]
  particulars: IParticular[]
  discounts: IDiscount[]
  formData: IOfficialReceipt
  handleInputChange: (input_name: string, value: string | number | null) => void
}