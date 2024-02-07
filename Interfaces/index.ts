import { SvgIconComponent } from "@mui/icons-material"

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