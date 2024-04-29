import { RocTemplateTypes } from '@/Interfaces'
import axios from 'axios'

export default class API {
  private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  // Fetch current user
  static async getCurrentUser(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Login user
  static async login(username: string, password: string) {
    return axios
      .post(`${API.API_BASE_URL}/api/v1/login`, {
        username,
        password,
      })
      .catch((error) => {
        return error.response
      })
      .then((response) => {
        return response
      })
  }

  // Logout user
  static async logout(accessToken: string) {
    return axios
      .post(`${API.API_BASE_URL}/api/v1/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((error) => {
        return error.response
      })
      .then((response) => {
        return response
      })
  }

  // Fetch all categories
  static async getCategories(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all categories
  static async getPaginatedCategories(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/categories-paginated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all categories with URL
  static async getCategoriesByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all accounts
  static async getAccounts(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all accounts
  static async getPaginatedAccounts(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/accounts-paginated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all accounts with URL
  static async getAccountsByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all payors
  static async getPayors(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/payors`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all particulars
  static async getParticulars(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/particulars`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all particulars
  static async getPaginatedParticulars(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/particulars-paginated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all particulars with URL
  static async getParticularsByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all official receipts
  static async getOfficialReceipts(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/official-receipts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all official receipts with URL
  static async getOfficialReceiptsByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Check if official receipts has duplicates
  static async checkOfficialReceiptsDuplicate(
    accessToken: string,
    orNo: string
  ) {
    return axios.get(
      `${API.API_BASE_URL}/api/v1/official-receipts/check-duplicate/${orNo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Fetch all discounts
  static async getDiscounts(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/discounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all discounts
  static async getPaginatedDiscounts(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/discounts-paginated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all discounts with URL
  static async getDiscountsByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all signatories
  static async getSignatories(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/signatories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all signatories
  static async getPaginatedSignatories(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/signatories-paginated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all signatories with URL
  static async getSignatoriesByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all paper sizes
  static async getPaperSizes(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/paper-sizes`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all paper sizes
  static async getPaginatedPaperSizes(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/paper-sizes-paginated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all paper sizes with URL
  static async getPaperSizesByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch printable OR
  static async getPrintableOR(
    accessToken: string,
    orId: string,
    paperSizeId: string,
    hasTemplate: '1' | '0'
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/print/official-receipt`,
      {
        or_id: orId,
        paper_size_id: paperSizeId,
        has_template: hasTemplate,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  // Fetch printable cash receipts record
  static async getPrintableCrr(
    accessToken: string,
    from: string,
    to: string,
    particulars: string,
    certifiedCorrectedBy: string,
    paperSizeId: string
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/print/cash-receipts-record`,
      {
        from,
        to,
        particulars_ids: particulars,
        certified_correct_id: certifiedCorrectedBy,
        paper_size_id: paperSizeId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  // Fetch printable report of collection preview data
  static async getPrintableRocPreviewData(
    accessToken: string,
    from: string,
    to: string,
    categories: string,
    certifiedCorrectedBy: string,
    notedBy: string,
    paperSizeId: string
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/print/preview-report-collection`,
      {
        from,
        to,
        category_ids: categories,
        certified_correct_id: certifiedCorrectedBy,
        noted_by_id: notedBy,
        paper_size_id: paperSizeId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  // Fetch printable report of collection
  static async getPrintableRoc(
    accessToken: string,
    printData?: string,
    from?: string,
    to?: string,
    categories?: string,
    certifiedCorrectedBy?: string,
    notedBy?: string,
    paperSizeId?: string,
    template?: RocTemplateTypes
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/print/report-collection?from=${from}` +
        `&to=${to}` +
        `&category_ids=${categories}` +
        `&certified_correct_id=${certifiedCorrectedBy}` +
        `&noted_by_id=${notedBy}` +
        `&paper_size_id=${paperSizeId}` +
        `&template=${template}` +
        `&print_data=${printData}`,
      {
        from,
        to,
        category_ids: categories,
        certified_correct_id: certifiedCorrectedBy,
        noted_by_id: notedBy,
        paper_size_id: paperSizeId,
        template,
        print_data: printData,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  // Fetch printable summary of fees
  static async getPrintableSof(accessToken: string) {
    return axios.post(`${API.API_BASE_URL}/api/v1/print/summary-fees`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  // Fetch printable e-receipts
  static async getPrintableEReceipts(
    accessToken: string,
    from: string,
    to: string,
    particulars: string,
    paperSizeId: string
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/print/e-receipts`,
      {
        from,
        to,
        particulars_ids: particulars,
        paper_size_id: paperSizeId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  // Fetch all official receipts
  static async getUsers(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/user-management/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all official receipts with URL
  static async getUsersByUrl(accessToken: string, url: string) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all positions
  static async getPositions(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/positions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all designations
  static async getDesignations(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/designations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Fetch all stations
  static async getStations(accessToken: string) {
    return axios.get(`${API.API_BASE_URL}/api/v1/stations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Create official receipt
  static async createOfficialReceipt(accessToken: string, formData: any) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/official-receipts`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // create categories
  static async createCategories(accessToken: string, formData: any) {
    return axios.post(`${API.API_BASE_URL}/api/v1/categories`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // create accounts
  static async createAccounts(accessToken: string, formData: any) {
    return axios.post(`${API.API_BASE_URL}/api/v1/accounts`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // create particulars
  static async createParticulars(accessToken: string, formData: any) {
    return axios.post(`${API.API_BASE_URL}/api/v1/particulars`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Create discounts
  static async createDiscount(accessToken: string, formData: any) {
    return axios.post(`${API.API_BASE_URL}/api/v1/discounts`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Create signatories
  static async createSignatory(accessToken: string, formData: any) {
    return axios.post(`${API.API_BASE_URL}/api/v1/signatories`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // create paper sizes
  static async createPaperSizes(accessToken: string, formData: any) {
    return axios.post(`${API.API_BASE_URL}/api/v1/paper-sizes`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Create users
  static async createUser(accessToken: string, formData: any) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/user-management/users`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update users
  static async updateUser(accessToken: string, userId: string, formData: any) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/user-management/users/${userId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update official receipt
  static async updateOfficialReceipt(
    accessToken: string,
    orId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/official-receipts/${orId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update categories
  static async updateCategory(
    accessToken: string,
    categoryId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/categories/${categoryId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update accounts
  static async updateAccount(
    accessToken: string,
    accountId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/accounts/${accountId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update particulars
  static async updateParticular(
    accessToken: string,
    particularId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/particulars/${particularId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update discounts
  static async updateDiscount(
    accessToken: string,
    discountId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/discounts/${discountId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update signatories
  static async updateSignatory(
    accessToken: string,
    discountId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/signatories/${discountId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update paper sizes
  static async updatePaperSize(
    accessToken: string,
    paperSizeId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/paper-sizes/${paperSizeId}?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Delete users
  static async deleteUser(accessToken: string, userId: string) {
    return axios.delete(
      `${API.API_BASE_URL}/api/v1/user-management/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Delete categories
  static async deleteCategory(accessToken: string, categoryId: string) {
    return axios.delete(`${API.API_BASE_URL}/api/v1/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Delete accounts
  static async deleteAccount(accessToken: string, accountId: string) {
    return axios.delete(`${API.API_BASE_URL}/api/v1/accounts/${accountId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Delete particulars
  static async deleteParticular(accessToken: string, particularId: string) {
    return axios.delete(
      `${API.API_BASE_URL}/api/v1/particulars/${particularId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Delete discounts
  static async deleteDisount(accessToken: string, discountId: string) {
    return axios.delete(`${API.API_BASE_URL}/api/v1/discounts/${discountId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Delete signatories
  static async deleteSignatory(accessToken: string, discountId: string) {
    return axios.delete(
      `${API.API_BASE_URL}/api/v1/signatories/${discountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Delete paper sizes
  static async deletePaperSize(accessToken: string, paperSizeId: string) {
    return axios.delete(
      `${API.API_BASE_URL}/api/v1/paper-sizes/${paperSizeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Update official receipt deposit
  static async depositOfficialReceipt(
    accessToken: string,
    orId: string,
    formData: any
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/official-receipts/${orId}/deposit?_method=PATCH`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Cancel official receipt
  static async cancelOfficialReceipt(accessToken: string, orId: string) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/official-receipts/${orId}/cancel?_method=PATCH`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  // Revert status official receipt
  static async revertToPendingOfficialReceipt(
    accessToken: string,
    orId: string
  ) {
    return axios.post(
      `${API.API_BASE_URL}/api/v1/official-receipts/${orId}/revert-status?_method=PATCH`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }
}
