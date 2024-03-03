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
  | 'users'
  | 'cateogories'
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
  formData?: any
  printUrl?: string
  handleClose: () => void
  handleLogout?: () => void
  handleCancel?: (id: string) => void
  handleDeposit?: (formData: any) => void
  handleCreate?: (formData: any) => void
  handleUpdate?: (formData: any) => void
  handleShowDelete?: () => void
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

export interface IUpdateContentProps {
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

export interface IUserSubContentProps {
  formData: IUser
  handleInputChange: (input_name: string, value: string | number | boolean | null) => void
}

export type OpenDialogType =
  | 'logout'
  | 'create_users'
  | 'create_categories'
  | 'create_particulars'
  | 'create_discounts'
  | 'create_signatories'
  | 'create_paper_sizes'
  | 'update_users'
  | 'update_categories'
  | 'update_particulars'
  | 'update_discounts'
  | 'update_signatories'
  | 'update_paper_sizes'
  | 'delete_users'
  | 'delete_categories'
  | 'delete_particulars'
  | 'delete_discounts'
  | 'delete_signatories'
  | 'delete_paper_sizes'
  | 'print'
  | 'deposit_or'
  | 'cancel_or'
export interface IOpenDialog {
  logout?: boolean
  create_users?: boolean
  create_cateogories?: boolean
  create_particulars?: boolean
  create_discounts?: boolean
  create_signatories?: boolean
  create_paper_sizes?: boolean
  update_users?: boolean
  update_categories?: boolean
  update_particulars?: boolean
  update_discounts?: boolean
  update_signatories?: boolean
  update_paper_sizes?: boolean
  delete_users?: boolean
  delete_categories?: boolean
  delete_particulars?: boolean
  delete_discounts?: boolean
  delete_signatories?: boolean
  delete_paper_sizes?: boolean
  deposit_or?: boolean
  cancel_or?: boolean
  print?: boolean
}

export interface ICardContainerProps {
  title?: string
  children?: React.ReactNode
}

export interface IPositions {
  id?: string
  position_name?: string
}

export interface IDesignations {
  id?: string
  designation_name?: string
}

export interface IStations {
  id?: string
  station_name?: string
}

export interface IPayor {
  id?: string
  payor_name: string
}

export interface IDiscount {
  id?: string
  discount_name?: string
  percent?: number
  percent_str?: string
  requires_card_no?: boolean
  requires_card_no_str?: string
  status?: string
}

export interface ICategories {
  id?: string
  category_name?: string
  order_no?: number
}

export interface IParticular {
  id?: string
  particular_name?: string
  category_id?: string
  category_str?: string
  default_amount?: number
  default_amount_str?: string
  order_no?: number
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

export interface IUser {
  id?: string
  first_name?: string
  middle_name?: string
  last_name?: string
  email?: string
  phone?: string
  position_id?: string
  position?: string
  designation_id?: string
  designation?: string
  station_id?: string
  station?: string
  username?: string
  password?: string
  role?: 'admin' | 'staff'
  is_active?: boolean
}

export interface IPaperSize {
  id?: string
  paper_name?: string
  width?: number
  height?: number
  width_str?: string
  height_str?: string
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

export interface IUserListColumn {
  id:
    | 'fullname'
    | 'phone_str'
    | 'email'
    | 'position'
    | 'designation'
    | 'station'
    | 'role_str'
    | 'status'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface ICateogryListColumn {
  id:
    | 'category_name'
    | 'order_no'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IParticularListColumn {
  id:
    | 'category_str'
    | 'particular_name'
    | 'default_amount_str'
    | 'order_no'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IDiscountListColumn {
  id:
    | 'discount_name'
    | 'percent_str'
    | 'requires_card_no_str'
    | 'status'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IPaperSizeListColumn {
  id:
    | 'paper_name'
    | 'width_str'
    | 'height_str'
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

export interface IUserListProps {
  rows: IUser[]
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IUser) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface ICategoryListProps {
  rows: ICategories[]
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IUser) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IParticularListProps {
  rows: IParticular[]
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IUser) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IDiscountListProps {
  rows: IDiscount[]
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IUser) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IPaperSizeListProps {
  rows: IPaperSize[]
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IUser) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export type SearchType = 'none' | 'search' | 'date_particulars'

export interface ITableListProps {
  displayType:
    | 'official_receipt'
    | 'categories'
    | 'particulars'
    | 'discounts'
    | 'signatories'
    | 'paper_sizes'
    | 'users'
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
  hasCreateButton?: boolean
  handleSearchChange: any
  handlePageChange: (url: string) => void
  handleShowDetails?: (id: string) => void
  handleShowCreate?: () => void
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
  handleShowCreate?: () => void
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