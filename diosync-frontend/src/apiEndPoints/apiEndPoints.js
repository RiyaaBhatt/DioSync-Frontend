export const API = {
  AUTH: {
    // LOGIN: '/accounts/login',
    LOGIN: '/accounts/login',
    LOGOUT: '/accounts/logout',
    REFRESH_TOKEN: '/accounts/token/refresh',
    USER: '/accounts/user',
    FORGOT: '/accounts/forget-password/send-mail',
    VERIFY_OTP: '/accounts/forget-password/verify-code',
    ADD_NEW_PASSWORD: '/accounts/forget-password/change-password',
    CHANGE_PASSWORD: '/accounts/login/change-password', // for the first time login and need to change password
    RESET_PASSWORD: '/accounts/reset-password',
    UPDATE_PROFILE: '/accounts/profile',
    GET_PROFILE: '/accounts/profile',
  },
  ADMIN: {
    GENERALDATA: '/admin-panel/general-data',
    BULK: '/admin-panel/actions/bulk',
    CITIES: '/admin-panel/city',
    STATES: '/admin-panel/state',
    COUNTRIES: '/admin-panel/country', // api depends
    TIMEZONE: '/admin-panel/timezone', // api depends
    COUNTRIESCODE: '/admin-panel/country-code/all',
    DASHBOARD: '/admin-panel/dashboard',
    CATEGORIES: '/admin-panel/categories',
    CATEGORIESALL: '/admin-panel/categories/all',
    SUBCATEGORIES: '/admin-panel/subcategories',
    SUBCATEGORIESALL: '/admin-panel/subcategories/all',
    CASESIZE: '/admin-panel/casesizes',
    CASESIZEALL: '/admin-panel/casesizes/all',
    UNITMEASURE: '/admin-panel/unitsofmeasure',
    CONATINER: '/admin-panel/containers',
    BREAKAGEANDLOSS: '/admin-panel/breakagelossreasons',
    SUBSCRIPTIONPLANS: '/admin-panel/subscriptionplans',
    SUBSCRIPTIONPLANSALL: '/admin-panel/subscriptionplans/all',
    CONTACTUSINQUIRY: '/admin-panel/contactinquiries',
    CONTACTUSINQUIRYREPLY: '/admin-panel/contactinquiries/replied',
    SUBSCRIPTIONINQUIRY: '/admin-panel/subscriptioninquiries',
    SUBSCRIPTIONINQUIRYREPLY: '/admin-panel/subscriptioninquiries/replied',
    REPORTS: '/admin-panel/report-csv',
    REPORTSCSV: '/admin-panel/report-csv/export',
    REPORTSFILTER: '/admin-panel/report-csv/filter',
    ACCOUNT: '/admin-panel/account',
    AUDIT_LOGS: '/admin-panel/audit-logs',
    GENERAL_SETTINGS: '/admin-panel/general-settings',
    UPDATE_GENERAL_SETTINGS: '/admin-panel/general-settings',
    EMAIL_SETTINGS: '/admin-panel/email-settings',
    UPDATE_EMAIL_SETTINGS: '/admin-panel/email-settings',
    ITEMS: '/admin-panel/items',
    INGREDIENTS: '/admin-panel/ingredients',
    INGREDIENTSALL: '/admin-panel/ingredients/all',
    INGREDIENTNEWALL: '/bar-owner/items/bar_venue/all',
    ADDBAROWNER: '/admin-panel/barowner',
    BAROWNER: '/admin-panel/barowner',
    BARVENUE: '/admin-panel/barvanue',
    BAROWNERVENUES: '/admin-panel/barvanue/bar-owner',
    LOGINBAROWNER: '/admin-panel/dashboard/bar_owner',
    SUBCATEGORIESFORNEWREFERENCE: '/admin-panel/subcategories-on-category',
  },
  OWNER: {
    GENERALDATA: '/bar-owner/general-data',
    CARTDATA: '/bar-owner/cart-drawer',
    NOTIFICATIONS: '/bar-owner/notification-list',
    DASHBOARDSTASTICS: '/bar-owner/dashboard-varience-yesterday-stockvalue',
    DASHBOARDLATESTUPDATES: '/bar-owner/latest-updates',
    DASHBOARDORDERALERT: '/bar-owner/order-alert',
    DASHBOARDTOPSELLINGITEMS: '/bar-owner/topselling-item-category-list',
    MULTIDASHBOARDSTASTICS: '/bar-owner/multivenue-varience-yesterday-stockvalue-profitability',
    MULTISALESGRAPH: '/bar-owner/multivenue-sales-overview-graph',
    ACCOUNT: '/bar-owner/profile',
    OWNRITEMS: '/bar-owner/items/bar_venue',
    ITEMS: '/bar-owner/items',
    ITEMSVENUE: '/bar-owner/items/all/bar_venue',
    INVENTORYSTOCKGRAPH: '/bar-owner/inventory-stockbycategory-lastfullinventory-stockvalue',
    MULTIVENUETOPSALES: '/bar-owner/multivenue-total-sales',
    INVENTORYSTOCKLIST: '/bar-owner/inventory-stock-list',
    SUPPLIERS: '/bar-owner/suppliers',
    OWNERSUPPLIER: '/bar-owner/suppliers/bar_venue',
    RECIPES: '/bar-owner/recipes',
    OWNERRECIPES: '/bar-owner/recipes/bar_venue',
    RECIPEBYID: '/bar-owner/recipes',
    VARINACES: '/bar-owner/variances',
    STOCKS: '/bar-owner/stock',
    TRUSTINDICATOR: '/bar-owner/trust-indictor',
    SALES: '/bar-owner/sales',
    TOPSELLINGRECIPES: '/bar-owner/top-selling-recipes-list',
    TOPSELLINGLIQUORS: '/bar-owner/top-selling-liquors-list',
    PURCHASE: '/bar-owner/purchase',
    COSTCHANGES: '/bar-owner/costchange',
    HISTORYINVENTORY: '/bar-owner/history/bar_venue',
    HISTORY: '/bar-owner/history',
    STAFFMEMBER: '/bar-owner/staff-member',
    ADDSTAFFMEMBER: '/bar-owner/register-staff-member',
    MANAGER: '/bar-owner/manager',
    ADDMANAGER: '/bar-owner/register-manager',
    UPDATEMANAGER: '/bar-owner/update-manager',
    PERMISSIONMODULE: '/bar-owner/modules',
    RECORDTRANSFER: '/staff-app/breakage-transfer-items/all',
    ADDCARTDATA: '/bar-owner/cart',
    UPDATEINVENTORYQUANTITY: '/bar-owner/update-inventory',
    EMPLOYEELIST: '/bar-owner/employees/all',
    BREAKAGEANDLOSSREASONS: '/admin-panel/breakagelossreasons/all',
    ADDRECORDBREAKAGE: '/bar-owner/breakage-loss',
    ADDRECORDTRANSFER: '/bar-owner/transfer',
    OWNERCARTDATA: '/bar-owner/cart',
    UPDATECART: '/bar-owner/cart/update',
    CARTORDERSUMMARY: '/bar-owner/order/summary',
    CARTSUMMARYSUPPLIERS: '/bar-owner/order/summary/suppliers',
    SENDORDER: '/bar-owner/order/send',
    SENDALLORDER: '/bar-owner/order/bulk/send',
    MYSUBSCRIPTION: '/bar-owner/subscription-details',
    CANCELSUBSCRIPTION: '/bar-owner/subscription-cancel',
    DELETECART: '/bar-owner/cart/update',
  },
}
