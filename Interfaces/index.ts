import { SvgIconComponent } from '@mui/icons-material'
import { SelectChangeEvent } from '@mui/material'

export type Role = 'admin' | 'staff'

export type OrDuplicateStatus = '' | 'success' | 'error' | 'duplicate'

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
  name?: string | JSX.Element
  role?: Role
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
  | 'accounts'
  | 'particulars'
  | 'discounts'
  | 'signatories'
  | 'paper_sizes'
  | 'print_official_receipt'
  | 'print_report_collection'

export type DialogType =
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'print'
  | 'print_preview'
  | 'cancel'
  | 'deposit'
  | 'revert'

export interface ISystemDialogProps {
  open: boolean
  id?: string
  title: string
  dialogType: DialogType
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
  handleRevert?: (id: string) => void
  handleDownload?: () => void
  handlePrint?: () => void
  handleInputChange?: any
}

export interface IDepositContentProps {
  formData: any
  handleInputChange: any
}

export interface ICreateContentProps {
  content: DialogContent
  dialogType: DialogType
  formData: any
  handleInputChange: any
}

export interface IUpdateContentProps {
  content: DialogContent
  dialogType: DialogType
  formData: any
  handleInputChange: any
}

export interface IPrintContentProps {
  printUrl: string
}

export interface IPrintPreviewContentProps {
  content: DialogContent
  printPreviewData: any
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IPreviewReportCollectionSubContentProps {
  printPreviewData: any
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ICategoriesSubContentProps {
  formData: ICategories
  dialogType: DialogType
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IAccountsSubContentProps {
  formData: IAccount
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IParticularsSubContentProps {
  dialogType: DialogType
  formData: IParticular
  handleInputChange: (
    input_name: string,
    value: string | number | boolean | null
  ) => void
}

export interface IDiscountsSubContentProps {
  formData: IDiscount
  dialogType: DialogType
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ISignatoriesSubContentProps {
  formData: ISignatory
  dialogType: DialogType
  handleInputChange: (
    input_name: string,
    value: string | number | any[] | boolean | null
  ) => void
}

export interface IPaperSizesSubContentProps {
  formData: IPaperSize
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IDepositSubContentProps {
  formData: IDeposit
  handleInputChange: (input_name: string, value: string | number | null) => void
}

export interface IUserSubContentProps {
  formData: IUser
  handleInputChange: (
    input_name: string,
    value: string | number | boolean | null
  ) => void
}

export type OpenDialogType =
  | 'logout'
  | 'create_users'
  | 'create_categories'
  | 'create_accounts'
  | 'create_particulars'
  | 'create_discounts'
  | 'create_signatories'
  | 'create_paper_sizes'
  | 'update_users'
  | 'update_categories'
  | 'update_accounts'
  | 'update_particulars'
  | 'update_discounts'
  | 'update_signatories'
  | 'update_paper_sizes'
  | 'delete_users'
  | 'delete_categories'
  | 'delete_accounts'
  | 'delete_particulars'
  | 'delete_discounts'
  | 'delete_signatories'
  | 'delete_paper_sizes'
  | 'print'
  | 'print_preview'
  | 'deposit_or'
  | 'cancel_or'
  | 'revert_to_pending_or'
export interface IOpenDialog {
  logout?: boolean
  create_users?: boolean
  create_categories?: boolean
  create_accounts?: boolean
  create_particulars?: boolean
  create_discounts?: boolean
  create_signatories?: boolean
  create_paper_sizes?: boolean
  update_users?: boolean
  update_categories?: boolean
  update_accounts?: boolean
  update_particulars?: boolean
  update_discounts?: boolean
  update_signatories?: boolean
  update_paper_sizes?: boolean
  delete_users?: boolean
  delete_categories?: boolean
  delete_accounts?: boolean
  delete_particulars?: boolean
  delete_discounts?: boolean
  delete_signatories?: boolean
  delete_paper_sizes?: boolean
  deposit_or?: boolean
  cancel_or?: boolean
  revert_to_pending_or?: boolean
  print?: boolean
  print_preview?: boolean
}

export interface ICardContainerProps {
  title?: string
  children?: React.ReactNode
}

export interface ICashReceiptsRecord {
  from: string | undefined
  to: string | undefined
  particulars_ids: string[]
  certified_correct_id: string
  paper_size_id: string
}

export type RocTemplateTypes =
  | 'coa_accounting'
  | 'pnp_crame'
  | 'firearms_registration'

export interface IRocTemplate {
  id: RocTemplateTypes
  label: string
}

export interface IReportCollection {
  from: string | undefined
  to: string | undefined
  category_ids: string[]
  certified_correct_id: string
  noted_by_id: string
  paper_size_id: string
  template: RocTemplateTypes
}

export interface IPrintEReceipts {
  from: string | undefined
  to: string | undefined
  particulars_ids: string[]
  paper_size_id: string
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
  is_active?: boolean
  status?: string
}

export interface ICategories {
  id?: string
  category_name?: string
  order_no?: number
}

export interface IAccount {
  id?: string
  account_name?: string
  account_number?: string
}

export interface IParticular {
  id?: string
  particular_name?: string
  category_id?: string
  category_str?: string
  account_id?: string
  account_str?: string
  default_amount?: number
  default_amount_str?: string
  order_no?: number
  sub_rows?: any[]
  coa_accounting?: boolean
  pnp_crame?: boolean
  firearms_registration?: boolean
}

export interface IOfficialReceipt {
  id?: string
  accountable_personnel_id?: string
  deposited_by_id?: string
  cancelled_by_id?: string
  accountable_personnel?: string
  deposited_by?: string
  cancelled_by?: string
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
  drawee_bank?: string
  check_no?: string
  check_date?: string
  is_cancelled?: boolean
  status?: string
  updated_at?: string
  created_at?: string
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

export type SignatoryTypes =
  | 'crr_certified_correct'
  | 'roc_certified_correct'
  | 'roc_noted_by'

export interface IReportModule {
  report: SignatoryTypes
  is_enabled: boolean
  position_id: string
  designation_id: string
  station_id: string
}

export interface ISignatory {
  id?: string
  signatory_name?: string
  report_module?: IReportModule[]
  is_active?: boolean
  status?: string
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
  label: string | JSX.Element
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

export interface IDateRangePicker {
  from: string | undefined
  to: string | undefined
  required?: boolean
  handleChange?: (
    input_name: string,
    value: string | string[] | undefined | null
  ) => void
}

export interface ICashReceiptsRecordProps {
  particulars: IParticular[]
  signatories: ISignatory[]
  paperSizes: IPaperSize[]
  inputData: ICashReceiptsRecord
  handleInputChange?: (
    input_name: string,
    value: string | string[] | undefined | null
  ) => void
  handlePrint?: () => void
}

export interface IReportCollectionProps {
  categories: ICategories[]
  signatories: ISignatory[]
  paperSizes: IPaperSize[]
  inputData: IReportCollection
  handleInputChange?: (
    input_name: string,
    value: string | string[] | undefined | null
  ) => void
  handlePrint?: () => void
}

export interface ISummaryFeesProps {
  printUrl: string
}

export interface IPrintEReceiptsProps {
  particulars: IParticular[]
  paperSizes: IPaperSize[]
  inputData: IPrintEReceipts
  handleInputChange?: (
    input_name: string,
    value: string | string[] | undefined | null
  ) => void
  handlePrint?: () => void
}

export interface ICreateOrProps {
  personnelName: string
  payors?: IPayor[]
  particulars?: IParticular[]
  discounts?: IDiscount[]
  computingDiscount?: boolean
  formData: IOfficialReceipt
  readOnly?: boolean
  enableUpdate?: boolean
  payorLoading?: boolean
  particularLoading?: boolean
  discountLoading?: boolean
  checkOrDuplicateLoading?: boolean
  paperSize?: string
  checkOrDuplicateStatus?: OrDuplicateStatus
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
  handleRevert?: () => void
  handleClose?: () => void
  handleEnableUpdate?: () => void
  handleDisableUpdate?: () => void
  handleUpdate?: (formData: any) => void
}

export interface ICreateOrActionButtonsProps {
  formData: IOfficialReceipt
  readOnly?: boolean
  enableUpdate?: boolean
  checkOrDuplicateStatus?: OrDuplicateStatus
  paperSize?: string
  handleCreate?: (formData: IOfficialReceipt, print: boolean) => void
  handlePrint?: (orId: string, paperSizeId: string) => void
  handleClear?: () => void
  handleDeposit?: () => void
  handleCancel?: () => void
  handleRevert?: () => void
  handleClose?: () => void
  handleUpdate?: (formData: any) => void
  handleEnableUpdate?: () => void
  handleDisableUpdate?: () => void
}

export interface ICreateOrFieldsProps {
  personnelName: string
  payors?: IPayor[]
  particulars?: IParticular[]
  discounts?: IDiscount[]
  computingDiscount?: boolean
  formData: IOfficialReceipt
  readOnly?: boolean
  enableUpdate?: boolean
  payorLoading?: boolean
  particularLoading?: boolean
  discountLoading?: boolean
  checkOrDuplicateStatus?: OrDuplicateStatus
  checkOrDuplicateLoading?: boolean
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
  id: 'category_name' | 'order_no'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IAccountListColumn {
  id: 'account_name' | 'account_number'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IParticularListColumn {
  id:
    | 'dropdown'
    | 'category_name'
    | 'category_str'
    | 'account_str'
    | 'particular_name'
    | 'default_amount_str'
    | 'order_no'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IDiscountListColumn {
  id: 'discount_name' | 'percent_str' | 'requires_card_no_str' | 'status'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface ISignatoryListColumn {
  id: 'signatory_name' | 'status'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

export interface IPaperSizeListColumn {
  id: 'paper_name' | 'width_str' | 'height_str'
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
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  showDetails: boolean
  details: IOfficialReceipt
  formData?: IOfficialReceipt
  paperSize?: string
  payors?: IPayor[]
  particulars?: IParticular[]
  discounts?: IDiscount[]
  enableUpdate?: boolean
  payorLoading?: boolean
  particularLoading?: boolean
  discountLoading?: boolean
  computingDiscount?: boolean
  checkOrDuplicateLoading?: boolean
  checkOrDuplicateStatus?: OrDuplicateStatus
  handleShowDetails: (details: IOfficialReceipt) => void
  handleCloseDetails: () => void
  handlePageChange: (url: string) => void
  handleDeposit: () => void
  handleCancel: () => void
  handleRevert: () => void
  handlePrintDownloadOr?: (
    orId: string,
    paperSizeId: string,
    print: boolean
  ) => void
  handleInputChange?: (
    input_name: string,
    value: string | number | null
  ) => void
  handleEnableUpdate?: () => void
  handleDisableUpdate?: () => void
  handleUpdate?: (formData: any) => void
}

export interface IUserListProps {
  rows: IUser[]
  loading?: boolean
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
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: ICategories) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IAccountListProps {
  rows: IAccount[]
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: ICategories) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IParticularListProps {
  rows: IParticular[]
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IParticular) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IDiscountListProps {
  rows: IDiscount[]
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IDiscount) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface ISignatoryListProps {
  rows: ISignatory[]
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: ISignatory) => void
  handleShowCreate: () => void
  handlePageChange: (url: string) => void
}

export interface IPaperSizeListProps {
  rows: IPaperSize[]
  loading?: boolean
  currentPage: number
  nextPageUrl: string
  prevPageUrl: string
  from: number
  to: number
  total: number
  links: ITableListLinks[]
  handleShowDetails: (details: IPaperSize) => void
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
  subColumns?: any
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
  loading?: boolean
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
  deposited_date: string
  deposit: number
  has_discount: boolean
  card_no?: string
  regular: number
  discounted: number
}

export interface ISearchData {
  from: string | undefined
  to: string | undefined
  particulars: string
}

export interface IAutocomplete {
  id?: string
  name: string
  label: string
  loading?: boolean
  data: any[]
  value?: string
  required?: boolean
  handleFetchData?: () => void
  handleChange?: (e: any, newValue: any) => void
  handleInputChange?: (e: any, newValue: any) => void
}

export interface ISelect {
  id: string
  label: string
  loading?: boolean
  data: any[]
  value: string | string[]
  isSignatories?: boolean
  signatoryType?: SignatoryTypes
  width?: string | number | Object
  height?: string | number | Object
  required?: boolean
  handleChange?: (e: SelectChangeEvent<any>) => void
}
