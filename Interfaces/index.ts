import { SvgIconComponent } from '@mui/icons-material'

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

export type DialogContent =
  | 'particulars'
  | 'discounts'
  | 'signatories'
  | 'paper_sizes'
  | 'print_official_receipt'

export interface ISystemDialogProps {
  open: boolean
  id?: string
  title: string
  dialogType:
    | 'logout'
    | 'create'
    | 'update'
    | 'delete'
    | 'print'
    | 'cancel'
    | 'deposit'
  content?: DialogContent
  formData?: ILoginProps | IParticular | IDiscount | IPaperSize | IDeposit
  printUrl?: string
  handleClose: () => void
  handleLogout?: () => void
  handleCancel?: (id: string) => void
  handleDeposit?: (formData: any) => void
  handleCreate?: (formData: any) => void
  handleUpdate?: (formData: any) => void
  handleDelete?: (id: string) => void
  handleClear?: () => void
  handleDownload?: () => void
  handleInputChange?: any
}

export interface IDepositContentProps {
  formData: any
  handleInputChange: any
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

export interface IDepositSubContentProps {
  formData: IDeposit
  handleInputChange: (input_name: string, value: string | number | null) => void
}

export type OpenDialogType =
  | 'logout'
  | 'create_particulars'
  | 'create_discounts'
  | 'print'
  | 'deposit_or'
  | 'cancel_or'
export interface IOpenDialog {
  logout?: boolean
  create_particulars?: boolean
  create_discounts?: boolean
  deposit_or?: boolean
  cancel_or?: boolean
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
  requires_card_no?: boolean
}

export interface ICategories {
  id?: string
  category_name?: string
}

export interface IParticular {
  id?: string
  particular_name?: string
  category_id?: string
  default_amount?: number
}

export interface IOfficialReceipt {
  id?: string
  accountable_personnel_id?: string
  accountable_personnel?: string
  receipt_date?: string
  deposited_date?: string
  cancelled_date?: string
  or_no?: string
  payor_id?: string
  nature_collection_id?: string
  amount?: number
  amount_str?: string
  discount_id?: string
  deposit?: number
  deposit_str?: string
  amount_words?: string
  card_no?: string
  payor?: string
  nature_collection?: string
  discount?: string
  discount_percent?: number
  payment_mode?: '' | 'cash' | 'check' | 'money_order'
  is_cancelled?: boolean
  status?: string
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
  personnelName: string
  payors?: IPayor[]
  particulars?: IParticular[]
  discounts?: IDiscount[]
  computingDiscount?: boolean
  formData: IOfficialReceipt
  readOnly?: boolean
  handleCreate?: (formData: IOfficialReceipt, print: boolean) => void
  handleInputChange?: (
    input_name: string,
    value: string | number | null
  ) => void
  handlePrint?: (orId: string, paperSizeId: string) => void
  handleClear?: () => void
  fetchPayor?: () => void
  fetchParticular?: () => void
  fetchDiscount?: () => void
  handleDialogOpen?: (dialogType: OpenDialogType) => void
  handleDeposit?: () => void
  handleCancel?: () => void
  handleClose?: () => void
}

export interface ICreateOrActionButtonsProps {
  formData: IOfficialReceipt
  readOnly?: boolean
  handleCreate?: (formData: IOfficialReceipt, print: boolean) => void
  handlePrint?: (orId: string, paperSizeId: string) => void
  handleClear?: () => void
  handleDeposit?: () => void
  handleCancel?: () => void
  handleClose?: () => void
}

export interface ICreateOrFieldsProps {
  personnelName: string
  payors?: IPayor[]
  particulars?: IParticular[]
  discounts?: IDiscount[]
  computingDiscount?: boolean
  formData: IOfficialReceipt
  readOnly?: boolean
  handleInputChange?: (
    input_name: string,
    value: string | number | null
  ) => void
  handleDialogOpen?: (dialogType: OpenDialogType) => void
  fetchPayor?: () => void
  fetchParticular?: () => void
  fetchDiscount?: () => void
}

export interface IOrColumn {
  id:
    | 'receipt_date'
    | 'or_no'
    | 'payor'
    | 'nature_collection'
    | 'amount_str'
    | 'status'
    | 'deposit_str'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface ITableListLinks {
  url: string
  label: string
  active: boolean
}

export interface IOrListProps {
  rows: IOfficialReceipt[]
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  showDetails: boolean
  details: IOfficialReceipt
  handleShowDetails: (details: IOfficialReceipt) => void
  handleCloseDetails: () => void
  handlePageChange: (url: string) => void
  handleDeposit: () => void
  handleCancel: () => void
}

export type SearchType = 'none' | 'search' | 'date_particulars'

export interface ITableListProps {
  displayType:
    | 'official_receipt'
    | 'particulars'
    | 'discounts'
    | 'signatories'
    | 'paper_sizes'
  columns: any
  rows: any
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  search: string
  searchLoading: boolean
  searchType: SearchType
  handleSearchChange: any
  handlePageChange: (url: string) => void
  handleShowDetails?: (id: string) => void
}

export interface ITableListPaginationProps {
  search?: string
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handlePageChange: (url: string) => void
}

export interface ITableListActionSectionProps {
  search: string
  hasCreateButton?: boolean
  searchLoading: boolean
  searchType: SearchType
  handleCreate?: () => void
  handleSearchChange: any
}

export interface ITableListActionSectionSearchProps {
  search: string
  loading: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ITableListActionSectionDateRangeParticularsProps {
  search: string
  loading: boolean
  handleChange: (value: string | null) => void
}

export interface IDeposit {
  id: string
  deposit: number
  has_discount: boolean
  card_no?: string
  regular: number
  discounted: number
}

export interface ISearchData {
  from: string
  to: string
  particulars: string
}