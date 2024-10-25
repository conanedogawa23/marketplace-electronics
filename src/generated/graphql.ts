import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export enum AccessLevels {
  Admin = 'admin',
  Delete = 'delete',
  Edit = 'edit',
  Read = 'read',
  Write = 'write'
}

export type ActivityLog = {
  __typename?: 'ActivityLog';
  activityId?: Maybe<Scalars['String']['output']>;
  activityReason?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  track?: Maybe<Array<Maybe<ActivityLogTrack>>>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type ActivityLogDetail = {
  __typename?: 'ActivityLogDetail';
  activityId?: Maybe<Scalars['String']['output']>;
  activityReason?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fromLocation?: Maybe<Array<Maybe<LocationField>>>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  projectProducts?: Maybe<Array<Maybe<ProjectProduct>>>;
  reason?: Maybe<Scalars['String']['output']>;
  reasonLog?: Maybe<ReasonLog>;
  serializedProducts?: Maybe<Array<Maybe<SerializedProduct>>>;
  status?: Maybe<Scalars['String']['output']>;
  toLocation?: Maybe<Array<Maybe<LocationField>>>;
  track?: Maybe<Array<Maybe<ActivityLogTrack>>>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ActivityLogDetailsList = {
  __typename?: 'ActivityLogDetailsList';
  activityLogDetails?: Maybe<Array<Maybe<ActivityLogDetail>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
};

export type ActivityLogInput = {
  activityId?: InputMaybe<Scalars['String']['input']>;
  activityReason?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  deletedBy?: InputMaybe<Scalars['String']['input']>;
  deletedNote?: InputMaybe<Scalars['String']['input']>;
  deletedReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  track?: InputMaybe<Array<InputMaybe<ActivityLogTrackInput>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  warehouse?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityLogList = {
  __typename?: 'ActivityLogList';
  activityLogs?: Maybe<Array<Maybe<ActivityLog>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
};

export type ActivityLogTrack = {
  __typename?: 'ActivityLogTrack';
  activityReason?: Maybe<Scalars['String']['output']>;
  deleteSerialNumbers?: Maybe<Scalars['Boolean']['output']>;
  fromLocation?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  serialNumbers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  toLocation?: Maybe<Scalars['String']['output']>;
};

export type ActivityLogTrackInput = {
  deleteSerialNumbers?: InputMaybe<Scalars['Boolean']['input']>;
  fromLocation?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  toLocation?: InputMaybe<Scalars['String']['input']>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type Area = {
  __typename?: 'Area';
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type AreaDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type AreaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  warehouse?: InputMaybe<Scalars['String']['input']>;
};

export type AreaList = {
  __typename?: 'AreaList';
  areas?: Maybe<Array<Maybe<Area>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Bin = {
  __typename?: 'Bin';
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shelf?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type BinDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type BinInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shelf?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type BinList = {
  __typename?: 'BinList';
  bins?: Maybe<Array<Maybe<Bin>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
};

export type Category = {
  __typename?: 'Category';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CategoryDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type CategoryInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryList = {
  __typename?: 'CategoryList';
  categories?: Maybe<Array<Maybe<Category>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
};

export type Client = {
  __typename?: 'Client';
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ClientType>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export enum ClientType {
  Client = 'client',
  Subclient = 'subclient'
}

export type Department = {
  __typename?: 'Department';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type DepartmentDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type DepartmentInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type DepartmentList = {
  __typename?: 'DepartmentList';
  departments?: Maybe<Array<Maybe<Department>>>;
  hasMore?: Maybe<Scalars['Boolean']['output']>;
};

export enum EmploymentStatus {
  Active = 'ACTIVE',
  Terminated = 'TERMINATED'
}

export type FileInfoType = {
  __typename?: 'FileInfoType';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type Inventory = {
  __typename?: 'Inventory';
  _id?: Maybe<Scalars['ID']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type InventoryDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type InventoryInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  deletedBy?: InputMaybe<Scalars['String']['input']>;
  deletedNote?: InputMaybe<Scalars['String']['input']>;
  deletedReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  vendors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type InventoryList = {
  __typename?: 'InventoryList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  invList?: Maybe<Array<Maybe<Inventory>>>;
};

export type Location = {
  __typename?: 'Location';
  _id?: Maybe<Scalars['ID']['output']>;
  area?: Maybe<Scalars['String']['output']>;
  bin?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rack?: Maybe<Scalars['String']['output']>;
  shelf?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<LocationTypes>;
  updatedAt: Scalars['String']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type LocationData = {
  __typename?: 'LocationData';
  area?: Maybe<Area>;
  bin?: Maybe<Bin>;
  name?: Maybe<Scalars['String']['output']>;
  rack?: Maybe<Rack>;
  shelf?: Maybe<Shelf>;
  uuid?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Warehouse>;
};

export type LocationDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type LocationField = {
  __typename?: 'LocationField';
  _id?: Maybe<Scalars['ID']['output']>;
  area?: Maybe<Area>;
  bin?: Maybe<Bin>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onUsed?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  rack?: Maybe<Rack>;
  shelf?: Maybe<Shelf>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  warehouse?: Maybe<Warehouse>;
};

export type LocationInput = {
  area?: InputMaybe<Scalars['String']['input']>;
  bin?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rack?: InputMaybe<Scalars['String']['input']>;
  shelf?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  warehouse?: InputMaybe<Scalars['String']['input']>;
};

export type LocationList = {
  __typename?: 'LocationList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  locations?: Maybe<Array<Maybe<Location>>>;
};

export type LocationProduct = {
  __typename?: 'LocationProduct';
  batchNumber?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  expirationDate?: Maybe<Scalars['String']['output']>;
  lastChecked?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']['output']>;
  receivedDate?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type LocationProductDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type LocationProductDetails = {
  __typename?: 'LocationProductDetails';
  batchNumber?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  expirationDate?: Maybe<Scalars['String']['output']>;
  lastChecked?: Maybe<Scalars['String']['output']>;
  location?: Maybe<LocationData>;
  onUsed?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']['output']>;
  receivedDate?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type LocationProductDetailsList = {
  __typename?: 'LocationProductDetailsList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  locationProductDetails?: Maybe<Array<Maybe<LocationProductDetails>>>;
};

export type LocationProductInput = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  lastChecked?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  receivedDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type LocationProductList = {
  __typename?: 'LocationProductList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  locationProducts?: Maybe<Array<Maybe<LocationProduct>>>;
};

export enum LocationTypes {
  Company = 'company',
  Project = 'project'
}

export type Manufacturer = {
  __typename?: 'Manufacturer';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ManufacturerDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type ManufacturerInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ManufacturerList = {
  __typename?: 'ManufacturerList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  manufacturer?: Maybe<Array<Maybe<Manufacturer>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  areaCreate?: Maybe<Area>;
  areaDelete?: Maybe<Area>;
  areaUpdate?: Maybe<Area>;
  binCreate?: Maybe<Bin>;
  binDelete?: Maybe<Bin>;
  binUpdate?: Maybe<Bin>;
  categoryCreate?: Maybe<Category>;
  categoryDelete?: Maybe<Category>;
  categoryUpdate?: Maybe<Category>;
  createActivityLog?: Maybe<ActivityLog>;
  createInventory?: Maybe<Inventory>;
  createPermission?: Maybe<Permission>;
  createProduct?: Maybe<Product>;
  createReasonLog?: Maybe<ReasonLog>;
  createRole?: Maybe<UserRole>;
  createSerializedProduct?: Maybe<SerializedProduct>;
  createUser?: Maybe<User>;
  deleteActivityLog?: Maybe<ActivityLog>;
  deleteInventory?: Maybe<Inventory>;
  deletePermission?: Maybe<Permission>;
  deleteProduct?: Maybe<Product>;
  deleteReasonLog?: Maybe<ReasonLog>;
  deleteRole?: Maybe<UserRole>;
  deleteSerializedProduct?: Maybe<SerializedProduct>;
  deleteUser?: Maybe<User>;
  departmentCreate?: Maybe<Department>;
  departmentDelete?: Maybe<Department>;
  departmentUpdate?: Maybe<Department>;
  generateQRCode?: Maybe<Array<Maybe<QrCodeResponse>>>;
  locationCreate?: Maybe<Location>;
  locationDelete?: Maybe<Location>;
  locationProductCreate?: Maybe<LocationProduct>;
  locationProductDelete?: Maybe<LocationProduct>;
  locationProductUpdate?: Maybe<LocationProduct>;
  locationUpdate?: Maybe<Location>;
  loginUser?: Maybe<AuthPayload>;
  manufacturerCreate?: Maybe<Manufacturer>;
  manufacturerDelete?: Maybe<Manufacturer>;
  manufacturerUpdate?: Maybe<Manufacturer>;
  projectCreate?: Maybe<Project>;
  projectDelete?: Maybe<Project>;
  projectProductCreate?: Maybe<ProjectProduct>;
  projectProductDelete?: Maybe<ProjectProduct>;
  projectProductUpdate?: Maybe<ProjectProduct>;
  projectUpdate?: Maybe<Project>;
  rackCreate?: Maybe<Rack>;
  rackDelete?: Maybe<Rack>;
  rackUpdate?: Maybe<Rack>;
  resetPassword?: Maybe<UserPwdUpdate>;
  shelfCreate?: Maybe<Shelf>;
  shelfDelete?: Maybe<Shelf>;
  shelfUpdate?: Maybe<Shelf>;
  uomCreate?: Maybe<Uom>;
  uomDelete?: Maybe<Uom>;
  uomUpdate?: Maybe<Uom>;
  updateActivityLog?: Maybe<ActivityLog>;
  updateInventory?: Maybe<Inventory>;
  updatePermission?: Maybe<Permission>;
  updateProduct?: Maybe<Product>;
  updateProductSequence?: Maybe<Scalars['String']['output']>;
  updateReasonLog?: Maybe<ReasonLog>;
  updateRole?: Maybe<UserRole>;
  updateSerializedProduct?: Maybe<SerializedProduct>;
  updateUser?: Maybe<User>;
  uploadInventoryFile?: Maybe<Scalars['String']['output']>;
  vendorCreate?: Maybe<Vendor>;
  vendorDelete?: Maybe<Vendor>;
  vendorProductCreate?: Maybe<VendorProduct>;
  vendorProductDelete?: Maybe<VendorProduct>;
  vendorProductUpdate?: Maybe<VendorProduct>;
  vendorUpdate?: Maybe<Vendor>;
  warehouseCreate?: Maybe<Warehouse>;
  warehouseDelete?: Maybe<Warehouse>;
  warehouseUpdate?: Maybe<Warehouse>;
};


export type MutationAreaCreateArgs = {
  area: AreaInput;
};


export type MutationAreaDeleteArgs = {
  area: AreaDeleteInput;
};


export type MutationAreaUpdateArgs = {
  area: AreaInput;
};


export type MutationBinCreateArgs = {
  bin: BinInput;
};


export type MutationBinDeleteArgs = {
  bin: BinDeleteInput;
};


export type MutationBinUpdateArgs = {
  bin: BinInput;
};


export type MutationCategoryCreateArgs = {
  category: CategoryInput;
};


export type MutationCategoryDeleteArgs = {
  category: CategoryDeleteInput;
};


export type MutationCategoryUpdateArgs = {
  category: CategoryInput;
};


export type MutationCreateActivityLogArgs = {
  activity: ActivityLogInput;
};


export type MutationCreateInventoryArgs = {
  inventory?: InputMaybe<InventoryInput>;
};


export type MutationCreatePermissionArgs = {
  permission: PermissionInput;
};


export type MutationCreateProductArgs = {
  product: ProductInput;
};


export type MutationCreateReasonLogArgs = {
  reasonLog: ReasonLogInput;
};


export type MutationCreateRoleArgs = {
  role: RoleInput;
};


export type MutationCreateSerializedProductArgs = {
  serializedProduct: SerializedProductInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteActivityLogArgs = {
  uuid: Scalars['String']['input'];
};


export type MutationDeleteInventoryArgs = {
  inventory: InventoryDeleteInput;
};


export type MutationDeletePermissionArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  product: ProductDeleteInput;
};


export type MutationDeleteReasonLogArgs = {
  reasonLog: ReasonLogInput;
};


export type MutationDeleteRoleArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteSerializedProductArgs = {
  serializedProduct: SerializedProductInput;
};


export type MutationDeleteUserArgs = {
  user: UserDeleteInput;
};


export type MutationDepartmentCreateArgs = {
  department: DepartmentInput;
};


export type MutationDepartmentDeleteArgs = {
  department: DepartmentDeleteInput;
};


export type MutationDepartmentUpdateArgs = {
  department: DepartmentInput;
};


export type MutationGenerateQrCodeArgs = {
  qrInput: Array<InputMaybe<QrCodeInput>>;
};


export type MutationLocationCreateArgs = {
  location: LocationInput;
};


export type MutationLocationDeleteArgs = {
  location: LocationDeleteInput;
};


export type MutationLocationProductCreateArgs = {
  locationProduct: LocationProductInput;
};


export type MutationLocationProductDeleteArgs = {
  locationProduct: LocationProductDeleteInput;
};


export type MutationLocationProductUpdateArgs = {
  locationProduct: LocationProductInput;
};


export type MutationLocationUpdateArgs = {
  location: LocationInput;
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationManufacturerCreateArgs = {
  manufacturer: ManufacturerInput;
};


export type MutationManufacturerDeleteArgs = {
  manufacturer: ManufacturerDeleteInput;
};


export type MutationManufacturerUpdateArgs = {
  manufacturer: ManufacturerInput;
};


export type MutationProjectCreateArgs = {
  project: ProjectInput;
};


export type MutationProjectDeleteArgs = {
  project: ProjectDeleteInput;
};


export type MutationProjectProductCreateArgs = {
  projectProduct: ProjectProductInput;
};


export type MutationProjectProductDeleteArgs = {
  projectProduct: ProjectProductDeleteInput;
};


export type MutationProjectProductUpdateArgs = {
  projectProduct: ProjectProductInput;
};


export type MutationProjectUpdateArgs = {
  project: ProjectInput;
};


export type MutationRackCreateArgs = {
  rack: RackInput;
};


export type MutationRackDeleteArgs = {
  rack: RackDeleteInput;
};


export type MutationRackUpdateArgs = {
  rack: RackInput;
};


export type MutationResetPasswordArgs = {
  newPwdData: UserPwdUpdateInput;
};


export type MutationShelfCreateArgs = {
  shelf: ShelfInput;
};


export type MutationShelfDeleteArgs = {
  shelf: ShelfDeleteInput;
};


export type MutationShelfUpdateArgs = {
  shelf: ShelfInput;
};


export type MutationUomCreateArgs = {
  uom: UomInput;
};


export type MutationUomDeleteArgs = {
  uom: UomDeleteInput;
};


export type MutationUomUpdateArgs = {
  uom: UomInput;
};


export type MutationUpdateActivityLogArgs = {
  activity: ActivityLogInput;
};


export type MutationUpdateInventoryArgs = {
  inventory: InventoryInput;
};


export type MutationUpdatePermissionArgs = {
  permission: PermissionInput;
};


export type MutationUpdateProductArgs = {
  product: ProductInputUpdate;
};


export type MutationUpdateProductSequenceArgs = {
  products: UpdateProductSequenceInput;
};


export type MutationUpdateReasonLogArgs = {
  reasonLog: ReasonLogInput;
};


export type MutationUpdateRoleArgs = {
  role: RoleInput;
};


export type MutationUpdateSerializedProductArgs = {
  serializedProduct: SerializedProductInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};


export type MutationUploadInventoryFileArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationVendorCreateArgs = {
  vendor: VendorInput;
};


export type MutationVendorDeleteArgs = {
  vendor: VendorDeleteInput;
};


export type MutationVendorProductCreateArgs = {
  vendorProduct: VendorProductInput;
};


export type MutationVendorProductDeleteArgs = {
  vendorProduct: VendorProductDeleteInput;
};


export type MutationVendorProductUpdateArgs = {
  vendorProduct: VendorProductInput;
};


export type MutationVendorUpdateArgs = {
  vendor: VendorInput;
};


export type MutationWarehouseCreateArgs = {
  warehouse: WarehouseInput;
};


export type MutationWarehouseDeleteArgs = {
  warehouse: WarehouseDeleteInput;
};


export type MutationWarehouseUpdateArgs = {
  warehouse: WarehouseInput;
};

export type Permission = {
  __typename?: 'Permission';
  _id?: Maybe<Scalars['ID']['output']>;
  accessLevel?: Maybe<AccessLevels>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  feature?: Maybe<Scalars['String']['output']>;
  module?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PermissionInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  accessLevel?: InputMaybe<AccessLevels>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  feature?: InputMaybe<Scalars['String']['input']>;
  module?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PermissionList = {
  __typename?: 'PermissionList';
  module?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
};

export type Pricing = {
  __typename?: 'Pricing';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  mapp?: Maybe<Scalars['Float']['output']>;
  msrp?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sell?: Maybe<Scalars['Float']['output']>;
  shippingCost?: Maybe<Scalars['Float']['output']>;
  shippingSell?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PricingInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  mapp?: InputMaybe<Scalars['Float']['input']>;
  msrp?: InputMaybe<Scalars['Float']['input']>;
  sell?: InputMaybe<Scalars['Float']['input']>;
  shippingCost?: InputMaybe<Scalars['Float']['input']>;
  shippingSell?: InputMaybe<Scalars['Float']['input']>;
};

export type PricingInputUpdate = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  mapp?: InputMaybe<Scalars['Float']['input']>;
  msrp?: InputMaybe<Scalars['Float']['input']>;
  sell?: InputMaybe<Scalars['Float']['input']>;
  shippingCost?: InputMaybe<Scalars['Float']['input']>;
  shippingSell?: InputMaybe<Scalars['Float']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  _id?: Maybe<Scalars['ID']['output']>;
  adjusted?: Maybe<Scalars['Boolean']['output']>;
  attachments?: Maybe<Array<Maybe<FileInfoType>>>;
  category?: Maybe<Category>;
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  image?: Maybe<FileInfoType>;
  length?: Maybe<Scalars['Float']['output']>;
  locations?: Maybe<Array<Maybe<LocationField>>>;
  manufacturer?: Maybe<Manufacturer>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  onUsed?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Pricing>;
  quantity?: Maybe<Scalars['Int']['output']>;
  receiveStockProducts?: Maybe<Array<Maybe<ReceiveStockProduct>>>;
  serialized?: Maybe<Scalars['Boolean']['output']>;
  serializedProducts?: Maybe<Array<Maybe<SerializedProduct>>>;
  sku?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<ProductType>;
  uom?: Maybe<Uom>;
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vendors?: Maybe<Array<Maybe<Vendor>>>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ProductDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type ProductInWarehouseList = {
  __typename?: 'ProductInWarehouseList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  productInWarehouse?: Maybe<Array<Maybe<ProductInWarehouseUnit>>>;
};

export type ProductInWarehouseUnit = {
  __typename?: 'ProductInWarehouseUnit';
  product?: Maybe<Product>;
  warehouse?: Maybe<Scalars['String']['output']>;
};

export type ProductInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  onUsed?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<PricingInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialized?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<ProductType>;
  uom?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  vendors?: InputMaybe<Array<InputMaybe<VendorData>>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type ProductInputUpdate = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  onUsed?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<PricingInputUpdate>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialized?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<ProductType>;
  uom?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  vendors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type ProductList = {
  __typename?: 'ProductList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
};

export enum ProductType {
  NonStocked = 'non_stocked',
  Nonserialized = 'nonserialized',
  Serialized = 'serialized',
  Services = 'services',
  Stocked = 'stocked',
  Undefined = 'undefined'
}

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  client?: Maybe<Client>;
  company_location_id?: Maybe<Scalars['String']['output']>;
  company_location_name?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  equipment_margin?: Maybe<Scalars['String']['output']>;
  equipment_total?: Maybe<Scalars['String']['output']>;
  labor_tax?: Maybe<Scalars['String']['output']>;
  labor_total?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  payment_schedule?: Maybe<Scalars['String']['output']>;
  primary_contact_id?: Maybe<Scalars['String']['output']>;
  project_type?: Maybe<Scalars['String']['output']>;
  sales_tax?: Maybe<Scalars['String']['output']>;
  shipping_total?: Maybe<Scalars['String']['output']>;
  stage?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tax_total?: Maybe<Scalars['String']['output']>;
  total_margin?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type ProjectDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type ProjectInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectItem = {
  __typename?: 'ProjectItem';
  adjusted?: Maybe<Scalars['Boolean']['output']>;
  attachments?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Pricing>;
  quantity?: Maybe<Scalars['Int']['output']>;
  serialized?: Maybe<Scalars['Boolean']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ProjectItemFilters = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectItemsList = {
  __typename?: 'ProjectItemsList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  projectItems?: Maybe<Array<Maybe<ProjectItem>>>;
};

export type ProjectList = {
  __typename?: 'ProjectList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type ProjectProduct = {
  __typename?: 'ProjectProduct';
  allocated?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  product_location?: Maybe<LocationField>;
  project?: Maybe<Project>;
  quantity?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ProjectProductDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type ProjectProductInput = {
  allocated?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectProductList = {
  __typename?: 'ProjectProductList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  projectProducts?: Maybe<Array<Maybe<ProjectProduct>>>;
};

export type PurchaseOrder = {
  __typename?: 'PurchaseOrder';
  createdBy?: Maybe<Scalars['String']['output']>;
  custom_id?: Maybe<Scalars['String']['output']>;
  default_ship?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  purchasingSource?: Maybe<PurchasingSource>;
  ship_address?: Maybe<PurchaseOrderAddress>;
  ship_name?: Maybe<Scalars['String']['output']>;
  shipping_option?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PurchaseOrderAddress = {
  __typename?: 'PurchaseOrderAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type PurchaseOrderInput = {
  uuid: Scalars['String']['input'];
};

export type PurchaseOrderItem = {
  __typename?: 'PurchaseOrderItem';
  cost?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  order_notes?: Maybe<Scalars['String']['output']>;
  order_quantity?: Maybe<Scalars['Int']['output']>;
  order_status?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  project_quantity?: Maybe<Scalars['Int']['output']>;
  received_quantity?: Maybe<Scalars['Int']['output']>;
  short_description?: Maybe<Scalars['String']['output']>;
  source?: Maybe<PurchaseOrderItemSource>;
  total_order_cost?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PurchaseOrderItemSource = {
  __typename?: 'PurchaseOrderItemSource';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type PurchaseOrderItemsList = {
  __typename?: 'PurchaseOrderItemsList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  purchaseOrderItems?: Maybe<Array<Maybe<PurchaseOrderItem>>>;
};

export type PurchaseOrderList = {
  __typename?: 'PurchaseOrderList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  purchaseOrders?: Maybe<Array<Maybe<PurchaseOrder>>>;
};

export type PurchasingSource = {
  __typename?: 'PurchasingSource';
  company_name?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  dealer_number?: Maybe<Scalars['String']['output']>;
  default_ship?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type QrCodeInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  serializeIds?: InputMaybe<Array<InputMaybe<SerializeIdsInput>>>;
  sku: Scalars['String']['input'];
  type?: InputMaybe<ProductType>;
  uuid: Scalars['String']['input'];
};

export type QrCodeResponse = {
  __typename?: 'QrCodeResponse';
  name?: Maybe<Scalars['String']['output']>;
  qrCode?: Maybe<Scalars['String']['output']>;
  serialNo?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  activityLog?: Maybe<ActivityLog>;
  activityLogDetails?: Maybe<ActivityLogDetail>;
  activityLogDetailsListAdjust?: Maybe<ActivityLogDetailsList>;
  activityLogList?: Maybe<ActivityLogList>;
  areaList?: Maybe<AreaList>;
  binList?: Maybe<BinList>;
  category?: Maybe<Category>;
  categoryList?: Maybe<CategoryList>;
  department?: Maybe<Department>;
  departmentList?: Maybe<DepartmentList>;
  findPermission?: Maybe<Permission>;
  findRole?: Maybe<UserRole>;
  getUnauthorizedProductDetails?: Maybe<UnauthorizedProductDetails>;
  inventory?: Maybe<Inventory>;
  inventoryList?: Maybe<InventoryList>;
  location?: Maybe<Location>;
  locationList?: Maybe<LocationList>;
  locationProduct?: Maybe<LocationProduct>;
  locationProductDetailsList?: Maybe<LocationProductDetailsList>;
  locationProductList?: Maybe<LocationProductList>;
  locationTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  manufacturer?: Maybe<Manufacturer>;
  manufacturerList?: Maybe<ManufacturerList>;
  permissionList?: Maybe<Array<Maybe<PermissionList>>>;
  product?: Maybe<Product>;
  productFilterList?: Maybe<ProductList>;
  productList?: Maybe<ProductList>;
  productTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  productsForWarehouse?: Maybe<ProductInWarehouseList>;
  project?: Maybe<Project>;
  projectItemsList?: Maybe<ProjectItemsList>;
  projectList?: Maybe<ProjectList>;
  projectProduct?: Maybe<ProjectProduct>;
  projectProductList?: Maybe<ProjectProductList>;
  purchaseOrder?: Maybe<PurchaseOrder>;
  purchaseOrderItemsList?: Maybe<PurchaseOrderItemsList>;
  purchaseOrderList?: Maybe<PurchaseOrderList>;
  rackList?: Maybe<RackList>;
  reasonLogList?: Maybe<ReasonLogList>;
  receiveOrderList?: Maybe<Array<Maybe<ReceiveOrder>>>;
  roleList?: Maybe<Array<Maybe<UserRole>>>;
  serializedProducts?: Maybe<SerializedProductList>;
  shelfList?: Maybe<ShelfList>;
  uom?: Maybe<Uom>;
  uomList?: Maybe<UomList>;
  user?: Maybe<User>;
  userList?: Maybe<UserListPaginated>;
  vendor?: Maybe<Vendor>;
  vendorList?: Maybe<VendorList>;
  vendorProductList?: Maybe<VendorProductList>;
  warehouseList?: Maybe<WarehouseList>;
};


export type QueryActivityLogArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryActivityLogDetailsArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryActivityLogDetailsListAdjustArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ActivityLogInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryActivityLogListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ActivityLogInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAreaListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<AreaInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<AreaInput>;
};


export type QueryBinListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<BinInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryCategoryListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<CategoryInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<CategoryInput>;
};


export type QueryDepartmentArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryDepartmentListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<DepartmentInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<DepartmentInput>;
};


export type QueryFindPermissionArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryFindRoleArgs = {
  _id: UserRoleId;
};


export type QueryGetUnauthorizedProductDetailsArgs = {
  serialNo?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['String']['input'];
};


export type QueryInventoryArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryInventoryListArgs = {
  filters?: InputMaybe<InventoryInput>;
  textSearchFilters?: InputMaybe<InventoryInput>;
};


export type QueryLocationArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryLocationListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<LocationInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<LocationInput>;
};


export type QueryLocationProductArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryLocationProductDetailsListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<LocationProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocationProductListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<LocationProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryManufacturerArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryManufacturerListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ManufacturerInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<ManufacturerInput>;
};


export type QueryProductArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryProductFilterListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFields?: InputMaybe<ProductInput>;
};


export type QueryProductListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductsForWarehouseArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  warehouse: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryProjectItemsListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ProjectItemFilters>;
  first?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['String']['input'];
  textSearchFilters?: InputMaybe<ProjectItemFilters>;
};


export type QueryProjectListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ProjectInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<ProjectInput>;
};


export type QueryProjectProductArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryProjectProductListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ProjectProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPurchaseOrderArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryPurchaseOrderItemsListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  purchaseOrderId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPurchaseOrderListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<PurchaseOrderInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<PurchaseOrderInput>;
};


export type QueryRackListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<RackInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReasonLogListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ReasonLogInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFields?: InputMaybe<ReasonLogInput>;
};


export type QueryReceiveOrderListArgs = {
  query: Scalars['String']['input'];
};


export type QuerySerializedProductsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<SerializedProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFields?: InputMaybe<SerializedProductInput>;
};


export type QueryShelfListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ShelfInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUomArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryUomListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<UomInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryUserListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<UserInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<UserInput>;
};


export type QueryVendorArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryVendorListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<VendorInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<VendorInput>;
};


export type QueryVendorProductListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<VendorProductInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWarehouseListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<WarehouseInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  textSearchFilters?: InputMaybe<WarehouseInput>;
};

export type Rack = {
  __typename?: 'Rack';
  area?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type RackDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type RackInput = {
  area?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type RackList = {
  __typename?: 'RackList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  racks?: Maybe<Array<Maybe<Rack>>>;
};

export type ReasonLog = {
  __typename?: 'ReasonLog';
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ReasonLogInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  deletedBy?: InputMaybe<Scalars['String']['input']>;
  deletedNote?: InputMaybe<Scalars['String']['input']>;
  deletedReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ReasonLogList = {
  __typename?: 'ReasonLogList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  reasonLogs?: Maybe<Array<Maybe<ReasonLog>>>;
};

export type ReceiveOrder = {
  __typename?: 'ReceiveOrder';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Scalars['Boolean']['output']>;
  purchaseOrder?: Maybe<Scalars['Boolean']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ReceiveStockProduct = {
  __typename?: 'ReceiveStockProduct';
  location?: Maybe<Scalars['String']['output']>;
  location_product?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Scalars['String']['output']>;
  received_quantity?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type RoleInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RoleStatus>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export enum RoleStatus {
  Active = 'active',
  Deleted = 'deleted',
  Pending = 'pending',
  Rejected = 'rejected'
}

export type SerializeIdsInput = {
  id: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SerializedProduct = {
  __typename?: 'SerializedProduct';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type SerializedProductInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  deletedBy?: InputMaybe<Scalars['String']['input']>;
  deletedNote?: InputMaybe<Scalars['String']['input']>;
  deletedReason?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SerializedProductList = {
  __typename?: 'SerializedProductList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  serializedProducts?: Maybe<Array<Maybe<SerializedProduct>>>;
};

export type Shelf = {
  __typename?: 'Shelf';
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rack?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ShelfDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type ShelfInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rack?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ShelfList = {
  __typename?: 'ShelfList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  shelves?: Maybe<Array<Maybe<Shelf>>>;
};

export type UnauthorizedProductDetails = {
  __typename?: 'UnauthorizedProductDetails';
  _id?: Maybe<Scalars['ID']['output']>;
  adjusted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  image?: Maybe<FileInfoType>;
  length?: Maybe<Scalars['Float']['output']>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Pricing>;
  quantity?: Maybe<Scalars['Int']['output']>;
  serialized?: Maybe<Scalars['Boolean']['output']>;
  serializedProducts?: Maybe<Array<Maybe<SerializedProduct>>>;
  sku?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<ProductType>;
  uuid?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type Uom = {
  __typename?: 'Uom';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UomDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type UomInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UomList = {
  __typename?: 'UomList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  uoms?: Maybe<Array<Maybe<Uom>>>;
};

export type UpdateProductSequenceInput = {
  activityId?: InputMaybe<Scalars['String']['input']>;
  activityReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinationWarehouse?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<InputMaybe<UpdateProductSequenceProductsInput>>>;
  purchaseOrderId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  warehouse?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductSequenceProductsInput = {
  deleteSerialNumbers?: InputMaybe<Scalars['Boolean']['input']>;
  fromLocation: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  serialized?: InputMaybe<Scalars['Boolean']['input']>;
  toLocation: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Address>;
  admin?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  employeeId?: Maybe<Scalars['String']['output']>;
  employmentStatus?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  hireDate?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  role?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UserDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type UserInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<AddressInput>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['String']['input']>;
  employmentStatus?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserList = {
  __typename?: 'UserList';
  _id: Scalars['ID']['output'];
  address?: Maybe<Address>;
  admin?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['String']['output'];
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Department>;
  email: Scalars['String']['output'];
  employeeId?: Maybe<Scalars['String']['output']>;
  employmentStatus?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  hireDate?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  position: Scalars['String']['output'];
  projects?: Maybe<Array<Maybe<Project>>>;
  role?: Maybe<UserRole>;
  salary?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['String']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UserListPaginated = {
  __typename?: 'UserListPaginated';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UserPwdUpdate = {
  __typename?: 'UserPwdUpdate';
  message?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type UserPwdUpdateInput = {
  _id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
};

export type UserRole = {
  __typename?: 'UserRole';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<RoleStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UserRoleId = {
  uuid: Scalars['String']['input'];
};

export type Vendor = {
  __typename?: 'Vendor';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type VendorData = {
  id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type VendorDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type VendorInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type VendorList = {
  __typename?: 'VendorList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  vendors?: Maybe<Array<Maybe<Vendor>>>;
};

export type VendorProduct = {
  __typename?: 'VendorProduct';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vendor?: Maybe<Vendor>;
};

export type VendorProductDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type VendorProductInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export type VendorProductList = {
  __typename?: 'VendorProductList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  vendorProducts?: Maybe<Array<Maybe<VendorProduct>>>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletedNote?: Maybe<Scalars['String']['output']>;
  deletedReason?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type WarehouseDeleteInput = {
  note: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type WarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type WarehouseList = {
  __typename?: 'WarehouseList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  warehouses?: Maybe<Array<Maybe<Warehouse>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessLevels: AccessLevels;
  ActivityLog: ResolverTypeWrapper<ActivityLog>;
  ActivityLogDetail: ResolverTypeWrapper<ActivityLogDetail>;
  ActivityLogDetailsList: ResolverTypeWrapper<ActivityLogDetailsList>;
  ActivityLogInput: ActivityLogInput;
  ActivityLogList: ResolverTypeWrapper<ActivityLogList>;
  ActivityLogTrack: ResolverTypeWrapper<ActivityLogTrack>;
  ActivityLogTrackInput: ActivityLogTrackInput;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Area: ResolverTypeWrapper<Area>;
  AreaDeleteInput: AreaDeleteInput;
  AreaInput: AreaInput;
  AreaList: ResolverTypeWrapper<AreaList>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Bin: ResolverTypeWrapper<Bin>;
  BinDeleteInput: BinDeleteInput;
  BinInput: BinInput;
  BinList: ResolverTypeWrapper<BinList>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryDeleteInput: CategoryDeleteInput;
  CategoryInput: CategoryInput;
  CategoryList: ResolverTypeWrapper<CategoryList>;
  Client: ResolverTypeWrapper<Client>;
  ClientType: ClientType;
  Department: ResolverTypeWrapper<Department>;
  DepartmentDeleteInput: DepartmentDeleteInput;
  DepartmentInput: DepartmentInput;
  DepartmentList: ResolverTypeWrapper<DepartmentList>;
  EmploymentStatus: EmploymentStatus;
  FileInfoType: ResolverTypeWrapper<FileInfoType>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Inventory: ResolverTypeWrapper<Inventory>;
  InventoryDeleteInput: InventoryDeleteInput;
  InventoryInput: InventoryInput;
  InventoryList: ResolverTypeWrapper<InventoryList>;
  Location: ResolverTypeWrapper<Location>;
  LocationData: ResolverTypeWrapper<LocationData>;
  LocationDeleteInput: LocationDeleteInput;
  LocationField: ResolverTypeWrapper<LocationField>;
  LocationInput: LocationInput;
  LocationList: ResolverTypeWrapper<LocationList>;
  LocationProduct: ResolverTypeWrapper<LocationProduct>;
  LocationProductDeleteInput: LocationProductDeleteInput;
  LocationProductDetails: ResolverTypeWrapper<LocationProductDetails>;
  LocationProductDetailsList: ResolverTypeWrapper<LocationProductDetailsList>;
  LocationProductInput: LocationProductInput;
  LocationProductList: ResolverTypeWrapper<LocationProductList>;
  LocationTypes: LocationTypes;
  Manufacturer: ResolverTypeWrapper<Manufacturer>;
  ManufacturerDeleteInput: ManufacturerDeleteInput;
  ManufacturerInput: ManufacturerInput;
  ManufacturerList: ResolverTypeWrapper<ManufacturerList>;
  Mutation: ResolverTypeWrapper<{}>;
  Permission: ResolverTypeWrapper<Permission>;
  PermissionInput: PermissionInput;
  PermissionList: ResolverTypeWrapper<PermissionList>;
  Pricing: ResolverTypeWrapper<Pricing>;
  PricingInput: PricingInput;
  PricingInputUpdate: PricingInputUpdate;
  Product: ResolverTypeWrapper<Product>;
  ProductDeleteInput: ProductDeleteInput;
  ProductInWarehouseList: ResolverTypeWrapper<ProductInWarehouseList>;
  ProductInWarehouseUnit: ResolverTypeWrapper<ProductInWarehouseUnit>;
  ProductInput: ProductInput;
  ProductInputUpdate: ProductInputUpdate;
  ProductList: ResolverTypeWrapper<ProductList>;
  ProductType: ProductType;
  Project: ResolverTypeWrapper<Project>;
  ProjectDeleteInput: ProjectDeleteInput;
  ProjectInput: ProjectInput;
  ProjectItem: ResolverTypeWrapper<ProjectItem>;
  ProjectItemFilters: ProjectItemFilters;
  ProjectItemsList: ResolverTypeWrapper<ProjectItemsList>;
  ProjectList: ResolverTypeWrapper<ProjectList>;
  ProjectProduct: ResolverTypeWrapper<ProjectProduct>;
  ProjectProductDeleteInput: ProjectProductDeleteInput;
  ProjectProductInput: ProjectProductInput;
  ProjectProductList: ResolverTypeWrapper<ProjectProductList>;
  PurchaseOrder: ResolverTypeWrapper<PurchaseOrder>;
  PurchaseOrderAddress: ResolverTypeWrapper<PurchaseOrderAddress>;
  PurchaseOrderInput: PurchaseOrderInput;
  PurchaseOrderItem: ResolverTypeWrapper<PurchaseOrderItem>;
  PurchaseOrderItemSource: ResolverTypeWrapper<PurchaseOrderItemSource>;
  PurchaseOrderItemsList: ResolverTypeWrapper<PurchaseOrderItemsList>;
  PurchaseOrderList: ResolverTypeWrapper<PurchaseOrderList>;
  PurchasingSource: ResolverTypeWrapper<PurchasingSource>;
  QrCodeInput: QrCodeInput;
  QrCodeResponse: ResolverTypeWrapper<QrCodeResponse>;
  Query: ResolverTypeWrapper<{}>;
  Rack: ResolverTypeWrapper<Rack>;
  RackDeleteInput: RackDeleteInput;
  RackInput: RackInput;
  RackList: ResolverTypeWrapper<RackList>;
  ReasonLog: ResolverTypeWrapper<ReasonLog>;
  ReasonLogInput: ReasonLogInput;
  ReasonLogList: ResolverTypeWrapper<ReasonLogList>;
  ReceiveOrder: ResolverTypeWrapper<ReceiveOrder>;
  ReceiveStockProduct: ResolverTypeWrapper<ReceiveStockProduct>;
  RoleInput: RoleInput;
  RoleStatus: RoleStatus;
  SerializeIdsInput: SerializeIdsInput;
  SerializedProduct: ResolverTypeWrapper<SerializedProduct>;
  SerializedProductInput: SerializedProductInput;
  SerializedProductList: ResolverTypeWrapper<SerializedProductList>;
  Shelf: ResolverTypeWrapper<Shelf>;
  ShelfDeleteInput: ShelfDeleteInput;
  ShelfInput: ShelfInput;
  ShelfList: ResolverTypeWrapper<ShelfList>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UnauthorizedProductDetails: ResolverTypeWrapper<UnauthorizedProductDetails>;
  Uom: ResolverTypeWrapper<Uom>;
  UomDeleteInput: UomDeleteInput;
  UomInput: UomInput;
  UomList: ResolverTypeWrapper<UomList>;
  UpdateProductSequenceInput: UpdateProductSequenceInput;
  UpdateProductSequenceProductsInput: UpdateProductSequenceProductsInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserDeleteInput: UserDeleteInput;
  UserInput: UserInput;
  UserList: ResolverTypeWrapper<UserList>;
  UserListPaginated: ResolverTypeWrapper<UserListPaginated>;
  UserPwdUpdate: ResolverTypeWrapper<UserPwdUpdate>;
  UserPwdUpdateInput: UserPwdUpdateInput;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserRoleId: UserRoleId;
  Vendor: ResolverTypeWrapper<Vendor>;
  VendorData: VendorData;
  VendorDeleteInput: VendorDeleteInput;
  VendorInput: VendorInput;
  VendorList: ResolverTypeWrapper<VendorList>;
  VendorProduct: ResolverTypeWrapper<VendorProduct>;
  VendorProductDeleteInput: VendorProductDeleteInput;
  VendorProductInput: VendorProductInput;
  VendorProductList: ResolverTypeWrapper<VendorProductList>;
  Warehouse: ResolverTypeWrapper<Warehouse>;
  WarehouseDeleteInput: WarehouseDeleteInput;
  WarehouseInput: WarehouseInput;
  WarehouseList: ResolverTypeWrapper<WarehouseList>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActivityLog: ActivityLog;
  ActivityLogDetail: ActivityLogDetail;
  ActivityLogDetailsList: ActivityLogDetailsList;
  ActivityLogInput: ActivityLogInput;
  ActivityLogList: ActivityLogList;
  ActivityLogTrack: ActivityLogTrack;
  ActivityLogTrackInput: ActivityLogTrackInput;
  Address: Address;
  AddressInput: AddressInput;
  Area: Area;
  AreaDeleteInput: AreaDeleteInput;
  AreaInput: AreaInput;
  AreaList: AreaList;
  AuthPayload: AuthPayload;
  Bin: Bin;
  BinDeleteInput: BinDeleteInput;
  BinInput: BinInput;
  BinList: BinList;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryDeleteInput: CategoryDeleteInput;
  CategoryInput: CategoryInput;
  CategoryList: CategoryList;
  Client: Client;
  Department: Department;
  DepartmentDeleteInput: DepartmentDeleteInput;
  DepartmentInput: DepartmentInput;
  DepartmentList: DepartmentList;
  FileInfoType: FileInfoType;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Inventory: Inventory;
  InventoryDeleteInput: InventoryDeleteInput;
  InventoryInput: InventoryInput;
  InventoryList: InventoryList;
  Location: Location;
  LocationData: LocationData;
  LocationDeleteInput: LocationDeleteInput;
  LocationField: LocationField;
  LocationInput: LocationInput;
  LocationList: LocationList;
  LocationProduct: LocationProduct;
  LocationProductDeleteInput: LocationProductDeleteInput;
  LocationProductDetails: LocationProductDetails;
  LocationProductDetailsList: LocationProductDetailsList;
  LocationProductInput: LocationProductInput;
  LocationProductList: LocationProductList;
  Manufacturer: Manufacturer;
  ManufacturerDeleteInput: ManufacturerDeleteInput;
  ManufacturerInput: ManufacturerInput;
  ManufacturerList: ManufacturerList;
  Mutation: {};
  Permission: Permission;
  PermissionInput: PermissionInput;
  PermissionList: PermissionList;
  Pricing: Pricing;
  PricingInput: PricingInput;
  PricingInputUpdate: PricingInputUpdate;
  Product: Product;
  ProductDeleteInput: ProductDeleteInput;
  ProductInWarehouseList: ProductInWarehouseList;
  ProductInWarehouseUnit: ProductInWarehouseUnit;
  ProductInput: ProductInput;
  ProductInputUpdate: ProductInputUpdate;
  ProductList: ProductList;
  Project: Project;
  ProjectDeleteInput: ProjectDeleteInput;
  ProjectInput: ProjectInput;
  ProjectItem: ProjectItem;
  ProjectItemFilters: ProjectItemFilters;
  ProjectItemsList: ProjectItemsList;
  ProjectList: ProjectList;
  ProjectProduct: ProjectProduct;
  ProjectProductDeleteInput: ProjectProductDeleteInput;
  ProjectProductInput: ProjectProductInput;
  ProjectProductList: ProjectProductList;
  PurchaseOrder: PurchaseOrder;
  PurchaseOrderAddress: PurchaseOrderAddress;
  PurchaseOrderInput: PurchaseOrderInput;
  PurchaseOrderItem: PurchaseOrderItem;
  PurchaseOrderItemSource: PurchaseOrderItemSource;
  PurchaseOrderItemsList: PurchaseOrderItemsList;
  PurchaseOrderList: PurchaseOrderList;
  PurchasingSource: PurchasingSource;
  QrCodeInput: QrCodeInput;
  QrCodeResponse: QrCodeResponse;
  Query: {};
  Rack: Rack;
  RackDeleteInput: RackDeleteInput;
  RackInput: RackInput;
  RackList: RackList;
  ReasonLog: ReasonLog;
  ReasonLogInput: ReasonLogInput;
  ReasonLogList: ReasonLogList;
  ReceiveOrder: ReceiveOrder;
  ReceiveStockProduct: ReceiveStockProduct;
  RoleInput: RoleInput;
  SerializeIdsInput: SerializeIdsInput;
  SerializedProduct: SerializedProduct;
  SerializedProductInput: SerializedProductInput;
  SerializedProductList: SerializedProductList;
  Shelf: Shelf;
  ShelfDeleteInput: ShelfDeleteInput;
  ShelfInput: ShelfInput;
  ShelfList: ShelfList;
  String: Scalars['String']['output'];
  UnauthorizedProductDetails: UnauthorizedProductDetails;
  Uom: Uom;
  UomDeleteInput: UomDeleteInput;
  UomInput: UomInput;
  UomList: UomList;
  UpdateProductSequenceInput: UpdateProductSequenceInput;
  UpdateProductSequenceProductsInput: UpdateProductSequenceProductsInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserDeleteInput: UserDeleteInput;
  UserInput: UserInput;
  UserList: UserList;
  UserListPaginated: UserListPaginated;
  UserPwdUpdate: UserPwdUpdate;
  UserPwdUpdateInput: UserPwdUpdateInput;
  UserRole: UserRole;
  UserRoleId: UserRoleId;
  Vendor: Vendor;
  VendorData: VendorData;
  VendorDeleteInput: VendorDeleteInput;
  VendorInput: VendorInput;
  VendorList: VendorList;
  VendorProduct: VendorProduct;
  VendorProductDeleteInput: VendorProductDeleteInput;
  VendorProductInput: VendorProductInput;
  VendorProductList: VendorProductList;
  Warehouse: Warehouse;
  WarehouseDeleteInput: WarehouseDeleteInput;
  WarehouseInput: WarehouseInput;
  WarehouseList: WarehouseList;
};

export type ActivityLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityLog'] = ResolversParentTypes['ActivityLog']> = {
  activityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activityReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  track?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActivityLogTrack']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityLogDetail'] = ResolversParentTypes['ActivityLogDetail']> = {
  activityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activityReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fromLocation?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationField']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  projectProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectProduct']>>>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reasonLog?: Resolver<Maybe<ResolversTypes['ReasonLog']>, ParentType, ContextType>;
  serializedProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['SerializedProduct']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  toLocation?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationField']>>>, ParentType, ContextType>;
  track?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActivityLogTrack']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogDetailsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityLogDetailsList'] = ResolversParentTypes['ActivityLogDetailsList']> = {
  activityLogDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActivityLogDetail']>>>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityLogList'] = ResolversParentTypes['ActivityLogList']> = {
  activityLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActivityLog']>>>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogTrackResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityLogTrack'] = ResolversParentTypes['ActivityLogTrack']> = {
  activityReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleteSerialNumbers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  fromLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  serialNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  toLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AreaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Area'] = ResolversParentTypes['Area']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AreaListResolvers<ContextType = any, ParentType extends ResolversParentTypes['AreaList'] = ResolversParentTypes['AreaList']> = {
  areas?: Resolver<Maybe<Array<Maybe<ResolversTypes['Area']>>>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BinResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bin'] = ResolversParentTypes['Bin']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shelf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BinListResolvers<ContextType = any, ParentType extends ResolversParentTypes['BinList'] = ResolversParentTypes['BinList']> = {
  bins?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bin']>>>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryListResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryList'] = ResolversParentTypes['CategoryList']> = {
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ClientType']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DepartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DepartmentListResolvers<ContextType = any, ParentType extends ResolversParentTypes['DepartmentList'] = ResolversParentTypes['DepartmentList']> = {
  departments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileInfoTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileInfoType'] = ResolversParentTypes['FileInfoType']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inventory'] = ResolversParentTypes['Inventory']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vendors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryListResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryList'] = ResolversParentTypes['InventoryList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  invList?: Resolver<Maybe<Array<Maybe<ResolversTypes['Inventory']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shelf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['LocationTypes']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationData'] = ResolversParentTypes['LocationData']> = {
  area?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType>;
  bin?: Resolver<Maybe<ResolversTypes['Bin']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rack?: Resolver<Maybe<ResolversTypes['Rack']>, ParentType, ContextType>;
  shelf?: Resolver<Maybe<ResolversTypes['Shelf']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationField'] = ResolversParentTypes['LocationField']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType>;
  bin?: Resolver<Maybe<ResolversTypes['Bin']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onUsed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rack?: Resolver<Maybe<ResolversTypes['Rack']>, ParentType, ContextType>;
  shelf?: Resolver<Maybe<ResolversTypes['Shelf']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationListResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationList'] = ResolversParentTypes['LocationList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationProduct'] = ResolversParentTypes['LocationProduct']> = {
  batchNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastChecked?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  receivedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationProductDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationProductDetails'] = ResolversParentTypes['LocationProductDetails']> = {
  batchNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastChecked?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LocationData']>, ParentType, ContextType>;
  onUsed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  receivedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationProductDetailsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationProductDetailsList'] = ResolversParentTypes['LocationProductDetailsList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locationProductDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationProductDetails']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationProductListResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationProductList'] = ResolversParentTypes['LocationProductList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locationProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationProduct']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManufacturerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Manufacturer'] = ResolversParentTypes['Manufacturer']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManufacturerListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ManufacturerList'] = ResolversParentTypes['ManufacturerList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<Array<Maybe<ResolversTypes['Manufacturer']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  areaCreate?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType, RequireFields<MutationAreaCreateArgs, 'area'>>;
  areaDelete?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType, RequireFields<MutationAreaDeleteArgs, 'area'>>;
  areaUpdate?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType, RequireFields<MutationAreaUpdateArgs, 'area'>>;
  binCreate?: Resolver<Maybe<ResolversTypes['Bin']>, ParentType, ContextType, RequireFields<MutationBinCreateArgs, 'bin'>>;
  binDelete?: Resolver<Maybe<ResolversTypes['Bin']>, ParentType, ContextType, RequireFields<MutationBinDeleteArgs, 'bin'>>;
  binUpdate?: Resolver<Maybe<ResolversTypes['Bin']>, ParentType, ContextType, RequireFields<MutationBinUpdateArgs, 'bin'>>;
  categoryCreate?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationCategoryCreateArgs, 'category'>>;
  categoryDelete?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationCategoryDeleteArgs, 'category'>>;
  categoryUpdate?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationCategoryUpdateArgs, 'category'>>;
  createActivityLog?: Resolver<Maybe<ResolversTypes['ActivityLog']>, ParentType, ContextType, RequireFields<MutationCreateActivityLogArgs, 'activity'>>;
  createInventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, Partial<MutationCreateInventoryArgs>>;
  createPermission?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<MutationCreatePermissionArgs, 'permission'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'product'>>;
  createReasonLog?: Resolver<Maybe<ResolversTypes['ReasonLog']>, ParentType, ContextType, RequireFields<MutationCreateReasonLogArgs, 'reasonLog'>>;
  createRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'role'>>;
  createSerializedProduct?: Resolver<Maybe<ResolversTypes['SerializedProduct']>, ParentType, ContextType, RequireFields<MutationCreateSerializedProductArgs, 'serializedProduct'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deleteActivityLog?: Resolver<Maybe<ResolversTypes['ActivityLog']>, ParentType, ContextType, RequireFields<MutationDeleteActivityLogArgs, 'uuid'>>;
  deleteInventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<MutationDeleteInventoryArgs, 'inventory'>>;
  deletePermission?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<MutationDeletePermissionArgs, '_id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'product'>>;
  deleteReasonLog?: Resolver<Maybe<ResolversTypes['ReasonLog']>, ParentType, ContextType, RequireFields<MutationDeleteReasonLogArgs, 'reasonLog'>>;
  deleteRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, '_id'>>;
  deleteSerializedProduct?: Resolver<Maybe<ResolversTypes['SerializedProduct']>, ParentType, ContextType, RequireFields<MutationDeleteSerializedProductArgs, 'serializedProduct'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'user'>>;
  departmentCreate?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<MutationDepartmentCreateArgs, 'department'>>;
  departmentDelete?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<MutationDepartmentDeleteArgs, 'department'>>;
  departmentUpdate?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<MutationDepartmentUpdateArgs, 'department'>>;
  generateQRCode?: Resolver<Maybe<Array<Maybe<ResolversTypes['QrCodeResponse']>>>, ParentType, ContextType, RequireFields<MutationGenerateQrCodeArgs, 'qrInput'>>;
  locationCreate?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<MutationLocationCreateArgs, 'location'>>;
  locationDelete?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<MutationLocationDeleteArgs, 'location'>>;
  locationProductCreate?: Resolver<Maybe<ResolversTypes['LocationProduct']>, ParentType, ContextType, RequireFields<MutationLocationProductCreateArgs, 'locationProduct'>>;
  locationProductDelete?: Resolver<Maybe<ResolversTypes['LocationProduct']>, ParentType, ContextType, RequireFields<MutationLocationProductDeleteArgs, 'locationProduct'>>;
  locationProductUpdate?: Resolver<Maybe<ResolversTypes['LocationProduct']>, ParentType, ContextType, RequireFields<MutationLocationProductUpdateArgs, 'locationProduct'>>;
  locationUpdate?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<MutationLocationUpdateArgs, 'location'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>;
  manufacturerCreate?: Resolver<Maybe<ResolversTypes['Manufacturer']>, ParentType, ContextType, RequireFields<MutationManufacturerCreateArgs, 'manufacturer'>>;
  manufacturerDelete?: Resolver<Maybe<ResolversTypes['Manufacturer']>, ParentType, ContextType, RequireFields<MutationManufacturerDeleteArgs, 'manufacturer'>>;
  manufacturerUpdate?: Resolver<Maybe<ResolversTypes['Manufacturer']>, ParentType, ContextType, RequireFields<MutationManufacturerUpdateArgs, 'manufacturer'>>;
  projectCreate?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationProjectCreateArgs, 'project'>>;
  projectDelete?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationProjectDeleteArgs, 'project'>>;
  projectProductCreate?: Resolver<Maybe<ResolversTypes['ProjectProduct']>, ParentType, ContextType, RequireFields<MutationProjectProductCreateArgs, 'projectProduct'>>;
  projectProductDelete?: Resolver<Maybe<ResolversTypes['ProjectProduct']>, ParentType, ContextType, RequireFields<MutationProjectProductDeleteArgs, 'projectProduct'>>;
  projectProductUpdate?: Resolver<Maybe<ResolversTypes['ProjectProduct']>, ParentType, ContextType, RequireFields<MutationProjectProductUpdateArgs, 'projectProduct'>>;
  projectUpdate?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationProjectUpdateArgs, 'project'>>;
  rackCreate?: Resolver<Maybe<ResolversTypes['Rack']>, ParentType, ContextType, RequireFields<MutationRackCreateArgs, 'rack'>>;
  rackDelete?: Resolver<Maybe<ResolversTypes['Rack']>, ParentType, ContextType, RequireFields<MutationRackDeleteArgs, 'rack'>>;
  rackUpdate?: Resolver<Maybe<ResolversTypes['Rack']>, ParentType, ContextType, RequireFields<MutationRackUpdateArgs, 'rack'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['UserPwdUpdate']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPwdData'>>;
  shelfCreate?: Resolver<Maybe<ResolversTypes['Shelf']>, ParentType, ContextType, RequireFields<MutationShelfCreateArgs, 'shelf'>>;
  shelfDelete?: Resolver<Maybe<ResolversTypes['Shelf']>, ParentType, ContextType, RequireFields<MutationShelfDeleteArgs, 'shelf'>>;
  shelfUpdate?: Resolver<Maybe<ResolversTypes['Shelf']>, ParentType, ContextType, RequireFields<MutationShelfUpdateArgs, 'shelf'>>;
  uomCreate?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType, RequireFields<MutationUomCreateArgs, 'uom'>>;
  uomDelete?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType, RequireFields<MutationUomDeleteArgs, 'uom'>>;
  uomUpdate?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType, RequireFields<MutationUomUpdateArgs, 'uom'>>;
  updateActivityLog?: Resolver<Maybe<ResolversTypes['ActivityLog']>, ParentType, ContextType, RequireFields<MutationUpdateActivityLogArgs, 'activity'>>;
  updateInventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<MutationUpdateInventoryArgs, 'inventory'>>;
  updatePermission?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<MutationUpdatePermissionArgs, 'permission'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'product'>>;
  updateProductSequence?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateProductSequenceArgs, 'products'>>;
  updateReasonLog?: Resolver<Maybe<ResolversTypes['ReasonLog']>, ParentType, ContextType, RequireFields<MutationUpdateReasonLogArgs, 'reasonLog'>>;
  updateRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, 'role'>>;
  updateSerializedProduct?: Resolver<Maybe<ResolversTypes['SerializedProduct']>, ParentType, ContextType, RequireFields<MutationUpdateSerializedProductArgs, 'serializedProduct'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>;
  uploadInventoryFile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUploadInventoryFileArgs, 'file'>>;
  vendorCreate?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<MutationVendorCreateArgs, 'vendor'>>;
  vendorDelete?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<MutationVendorDeleteArgs, 'vendor'>>;
  vendorProductCreate?: Resolver<Maybe<ResolversTypes['VendorProduct']>, ParentType, ContextType, RequireFields<MutationVendorProductCreateArgs, 'vendorProduct'>>;
  vendorProductDelete?: Resolver<Maybe<ResolversTypes['VendorProduct']>, ParentType, ContextType, RequireFields<MutationVendorProductDeleteArgs, 'vendorProduct'>>;
  vendorProductUpdate?: Resolver<Maybe<ResolversTypes['VendorProduct']>, ParentType, ContextType, RequireFields<MutationVendorProductUpdateArgs, 'vendorProduct'>>;
  vendorUpdate?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<MutationVendorUpdateArgs, 'vendor'>>;
  warehouseCreate?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType, RequireFields<MutationWarehouseCreateArgs, 'warehouse'>>;
  warehouseDelete?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType, RequireFields<MutationWarehouseDeleteArgs, 'warehouse'>>;
  warehouseUpdate?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType, RequireFields<MutationWarehouseUpdateArgs, 'warehouse'>>;
};

export type PermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  accessLevel?: Resolver<Maybe<ResolversTypes['AccessLevels']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  module?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermissionList'] = ResolversParentTypes['PermissionList']> = {
  module?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Permission']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pricing'] = ResolversParentTypes['Pricing']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mapp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  msrp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sell?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  shippingCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  shippingSell?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  adjusted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<Maybe<ResolversTypes['FileInfoType']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['FileInfoType']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationField']>>>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['Manufacturer']>, ParentType, ContextType>;
  maxQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onUsed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Pricing']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  receiveStockProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReceiveStockProduct']>>>, ParentType, ContextType>;
  serialized?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  serializedProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['SerializedProduct']>>>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  uom?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vendors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vendor']>>>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductInWarehouseListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductInWarehouseList'] = ResolversParentTypes['ProductInWarehouseList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productInWarehouse?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductInWarehouseUnit']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductInWarehouseUnitResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductInWarehouseUnit'] = ResolversParentTypes['ProductInWarehouseUnit']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductList'] = ResolversParentTypes['ProductList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budget?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>;
  company_location_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company_location_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equipment_margin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equipment_total?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  labor_tax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  labor_total?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  payment_schedule?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primary_contact_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sales_tax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipping_total?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tax_total?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_margin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zipcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectItem'] = ResolversParentTypes['ProjectItem']> = {
  adjusted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Pricing']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  serialized?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectItemsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectItemsList'] = ResolversParentTypes['ProjectItemsList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  projectItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectList'] = ResolversParentTypes['ProjectList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectProduct'] = ResolversParentTypes['ProjectProduct']> = {
  allocated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  product_location?: Resolver<Maybe<ResolversTypes['LocationField']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectProductListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectProductList'] = ResolversParentTypes['ProjectProductList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  projectProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectProduct']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseOrder'] = ResolversParentTypes['PurchaseOrder']> = {
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  custom_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  default_ship?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  purchasingSource?: Resolver<Maybe<ResolversTypes['PurchasingSource']>, ParentType, ContextType>;
  ship_address?: Resolver<Maybe<ResolversTypes['PurchaseOrderAddress']>, ParentType, ContextType>;
  ship_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipping_option?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseOrderAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseOrderAddress'] = ResolversParentTypes['PurchaseOrderAddress']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postal_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseOrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseOrderItem'] = ResolversParentTypes['PurchaseOrderItem']> = {
  cost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  full_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order_quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  order_status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  project_quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  received_quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  short_description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['PurchaseOrderItemSource']>, ParentType, ContextType>;
  total_order_cost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseOrderItemSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseOrderItemSource'] = ResolversParentTypes['PurchaseOrderItemSource']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseOrderItemsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseOrderItemsList'] = ResolversParentTypes['PurchaseOrderItemsList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  purchaseOrderItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['PurchaseOrderItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseOrderListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchaseOrderList'] = ResolversParentTypes['PurchaseOrderList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  purchaseOrders?: Resolver<Maybe<Array<Maybe<ResolversTypes['PurchaseOrder']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchasingSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PurchasingSource'] = ResolversParentTypes['PurchasingSource']> = {
  company_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dealer_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  default_ship?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QrCodeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QrCodeResponse'] = ResolversParentTypes['QrCodeResponse']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qrCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serialNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activityLog?: Resolver<Maybe<ResolversTypes['ActivityLog']>, ParentType, ContextType, RequireFields<QueryActivityLogArgs, 'uuid'>>;
  activityLogDetails?: Resolver<Maybe<ResolversTypes['ActivityLogDetail']>, ParentType, ContextType, RequireFields<QueryActivityLogDetailsArgs, 'uuid'>>;
  activityLogDetailsListAdjust?: Resolver<Maybe<ResolversTypes['ActivityLogDetailsList']>, ParentType, ContextType, Partial<QueryActivityLogDetailsListAdjustArgs>>;
  activityLogList?: Resolver<Maybe<ResolversTypes['ActivityLogList']>, ParentType, ContextType, Partial<QueryActivityLogListArgs>>;
  areaList?: Resolver<Maybe<ResolversTypes['AreaList']>, ParentType, ContextType, Partial<QueryAreaListArgs>>;
  binList?: Resolver<Maybe<ResolversTypes['BinList']>, ParentType, ContextType, Partial<QueryBinListArgs>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'uuid'>>;
  categoryList?: Resolver<Maybe<ResolversTypes['CategoryList']>, ParentType, ContextType, Partial<QueryCategoryListArgs>>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<QueryDepartmentArgs, 'uuid'>>;
  departmentList?: Resolver<Maybe<ResolversTypes['DepartmentList']>, ParentType, ContextType, Partial<QueryDepartmentListArgs>>;
  findPermission?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<QueryFindPermissionArgs, '_id'>>;
  findRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType, RequireFields<QueryFindRoleArgs, '_id'>>;
  getUnauthorizedProductDetails?: Resolver<Maybe<ResolversTypes['UnauthorizedProductDetails']>, ParentType, ContextType, RequireFields<QueryGetUnauthorizedProductDetailsArgs, 'uuid'>>;
  inventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType, RequireFields<QueryInventoryArgs, 'uuid'>>;
  inventoryList?: Resolver<Maybe<ResolversTypes['InventoryList']>, ParentType, ContextType, Partial<QueryInventoryListArgs>>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryLocationArgs, 'uuid'>>;
  locationList?: Resolver<Maybe<ResolversTypes['LocationList']>, ParentType, ContextType, Partial<QueryLocationListArgs>>;
  locationProduct?: Resolver<Maybe<ResolversTypes['LocationProduct']>, ParentType, ContextType, RequireFields<QueryLocationProductArgs, 'uuid'>>;
  locationProductDetailsList?: Resolver<Maybe<ResolversTypes['LocationProductDetailsList']>, ParentType, ContextType, Partial<QueryLocationProductDetailsListArgs>>;
  locationProductList?: Resolver<Maybe<ResolversTypes['LocationProductList']>, ParentType, ContextType, Partial<QueryLocationProductListArgs>>;
  locationTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['Manufacturer']>, ParentType, ContextType, RequireFields<QueryManufacturerArgs, 'uuid'>>;
  manufacturerList?: Resolver<Maybe<ResolversTypes['ManufacturerList']>, ParentType, ContextType, Partial<QueryManufacturerListArgs>>;
  permissionList?: Resolver<Maybe<Array<Maybe<ResolversTypes['PermissionList']>>>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'uuid'>>;
  productFilterList?: Resolver<Maybe<ResolversTypes['ProductList']>, ParentType, ContextType, Partial<QueryProductFilterListArgs>>;
  productList?: Resolver<Maybe<ResolversTypes['ProductList']>, ParentType, ContextType, Partial<QueryProductListArgs>>;
  productTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  productsForWarehouse?: Resolver<Maybe<ResolversTypes['ProductInWarehouseList']>, ParentType, ContextType, RequireFields<QueryProductsForWarehouseArgs, 'warehouse'>>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'uuid'>>;
  projectItemsList?: Resolver<Maybe<ResolversTypes['ProjectItemsList']>, ParentType, ContextType, RequireFields<QueryProjectItemsListArgs, 'projectId'>>;
  projectList?: Resolver<Maybe<ResolversTypes['ProjectList']>, ParentType, ContextType, Partial<QueryProjectListArgs>>;
  projectProduct?: Resolver<Maybe<ResolversTypes['ProjectProduct']>, ParentType, ContextType, RequireFields<QueryProjectProductArgs, 'uuid'>>;
  projectProductList?: Resolver<Maybe<ResolversTypes['ProjectProductList']>, ParentType, ContextType, Partial<QueryProjectProductListArgs>>;
  purchaseOrder?: Resolver<Maybe<ResolversTypes['PurchaseOrder']>, ParentType, ContextType, RequireFields<QueryPurchaseOrderArgs, 'uuid'>>;
  purchaseOrderItemsList?: Resolver<Maybe<ResolversTypes['PurchaseOrderItemsList']>, ParentType, ContextType, Partial<QueryPurchaseOrderItemsListArgs>>;
  purchaseOrderList?: Resolver<Maybe<ResolversTypes['PurchaseOrderList']>, ParentType, ContextType, Partial<QueryPurchaseOrderListArgs>>;
  rackList?: Resolver<Maybe<ResolversTypes['RackList']>, ParentType, ContextType, Partial<QueryRackListArgs>>;
  reasonLogList?: Resolver<Maybe<ResolversTypes['ReasonLogList']>, ParentType, ContextType, Partial<QueryReasonLogListArgs>>;
  receiveOrderList?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReceiveOrder']>>>, ParentType, ContextType, RequireFields<QueryReceiveOrderListArgs, 'query'>>;
  roleList?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  serializedProducts?: Resolver<Maybe<ResolversTypes['SerializedProductList']>, ParentType, ContextType, Partial<QuerySerializedProductsArgs>>;
  shelfList?: Resolver<Maybe<ResolversTypes['ShelfList']>, ParentType, ContextType, Partial<QueryShelfListArgs>>;
  uom?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType, RequireFields<QueryUomArgs, 'uuid'>>;
  uomList?: Resolver<Maybe<ResolversTypes['UomList']>, ParentType, ContextType, Partial<QueryUomListArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  userList?: Resolver<Maybe<ResolversTypes['UserListPaginated']>, ParentType, ContextType, Partial<QueryUserListArgs>>;
  vendor?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<QueryVendorArgs, 'uuid'>>;
  vendorList?: Resolver<Maybe<ResolversTypes['VendorList']>, ParentType, ContextType, Partial<QueryVendorListArgs>>;
  vendorProductList?: Resolver<Maybe<ResolversTypes['VendorProductList']>, ParentType, ContextType, Partial<QueryVendorProductListArgs>>;
  warehouseList?: Resolver<Maybe<ResolversTypes['WarehouseList']>, ParentType, ContextType, Partial<QueryWarehouseListArgs>>;
};

export type RackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rack'] = ResolversParentTypes['Rack']> = {
  area?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RackListResolvers<ContextType = any, ParentType extends ResolversParentTypes['RackList'] = ResolversParentTypes['RackList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  racks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Rack']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReasonLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReasonLog'] = ResolversParentTypes['ReasonLog']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReasonLogListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReasonLogList'] = ResolversParentTypes['ReasonLogList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reasonLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReasonLog']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceiveOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiveOrder'] = ResolversParentTypes['ReceiveOrder']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  purchaseOrder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceiveStockProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiveStockProduct'] = ResolversParentTypes['ReceiveStockProduct']> = {
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location_product?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  received_quantity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SerializedProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['SerializedProduct'] = ResolversParentTypes['SerializedProduct']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SerializedProductListResolvers<ContextType = any, ParentType extends ResolversParentTypes['SerializedProductList'] = ResolversParentTypes['SerializedProductList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  serializedProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['SerializedProduct']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShelfResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shelf'] = ResolversParentTypes['Shelf']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShelfListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShelfList'] = ResolversParentTypes['ShelfList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shelves?: Resolver<Maybe<Array<Maybe<ResolversTypes['Shelf']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthorizedProductDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnauthorizedProductDetails'] = ResolversParentTypes['UnauthorizedProductDetails']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  adjusted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['FileInfoType']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Pricing']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  serialized?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  serializedProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['SerializedProduct']>>>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Uom'] = ResolversParentTypes['Uom']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UomListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UomList'] = ResolversParentTypes['UomList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  uoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Uom']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employeeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employmentStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hireDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserList'] = ResolversParentTypes['UserList']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employeeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employmentStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hireDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Permission']>>>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  salary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserListPaginatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserListPaginated'] = ResolversParentTypes['UserListPaginated']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPwdUpdateResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPwdUpdate'] = ResolversParentTypes['UserPwdUpdate']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['RoleStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VendorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vendor'] = ResolversParentTypes['Vendor']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VendorListResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorList'] = ResolversParentTypes['VendorList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vendors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vendor']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VendorProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorProduct'] = ResolversParentTypes['VendorProduct']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vendor?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VendorProductListResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorProductList'] = ResolversParentTypes['VendorProductList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vendorProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['VendorProduct']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseListResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseList'] = ResolversParentTypes['WarehouseList']> = {
  hasMore?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Warehouse']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActivityLog?: ActivityLogResolvers<ContextType>;
  ActivityLogDetail?: ActivityLogDetailResolvers<ContextType>;
  ActivityLogDetailsList?: ActivityLogDetailsListResolvers<ContextType>;
  ActivityLogList?: ActivityLogListResolvers<ContextType>;
  ActivityLogTrack?: ActivityLogTrackResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  Area?: AreaResolvers<ContextType>;
  AreaList?: AreaListResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Bin?: BinResolvers<ContextType>;
  BinList?: BinListResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryList?: CategoryListResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  Department?: DepartmentResolvers<ContextType>;
  DepartmentList?: DepartmentListResolvers<ContextType>;
  FileInfoType?: FileInfoTypeResolvers<ContextType>;
  Inventory?: InventoryResolvers<ContextType>;
  InventoryList?: InventoryListResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationData?: LocationDataResolvers<ContextType>;
  LocationField?: LocationFieldResolvers<ContextType>;
  LocationList?: LocationListResolvers<ContextType>;
  LocationProduct?: LocationProductResolvers<ContextType>;
  LocationProductDetails?: LocationProductDetailsResolvers<ContextType>;
  LocationProductDetailsList?: LocationProductDetailsListResolvers<ContextType>;
  LocationProductList?: LocationProductListResolvers<ContextType>;
  Manufacturer?: ManufacturerResolvers<ContextType>;
  ManufacturerList?: ManufacturerListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Permission?: PermissionResolvers<ContextType>;
  PermissionList?: PermissionListResolvers<ContextType>;
  Pricing?: PricingResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductInWarehouseList?: ProductInWarehouseListResolvers<ContextType>;
  ProductInWarehouseUnit?: ProductInWarehouseUnitResolvers<ContextType>;
  ProductList?: ProductListResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectItem?: ProjectItemResolvers<ContextType>;
  ProjectItemsList?: ProjectItemsListResolvers<ContextType>;
  ProjectList?: ProjectListResolvers<ContextType>;
  ProjectProduct?: ProjectProductResolvers<ContextType>;
  ProjectProductList?: ProjectProductListResolvers<ContextType>;
  PurchaseOrder?: PurchaseOrderResolvers<ContextType>;
  PurchaseOrderAddress?: PurchaseOrderAddressResolvers<ContextType>;
  PurchaseOrderItem?: PurchaseOrderItemResolvers<ContextType>;
  PurchaseOrderItemSource?: PurchaseOrderItemSourceResolvers<ContextType>;
  PurchaseOrderItemsList?: PurchaseOrderItemsListResolvers<ContextType>;
  PurchaseOrderList?: PurchaseOrderListResolvers<ContextType>;
  PurchasingSource?: PurchasingSourceResolvers<ContextType>;
  QrCodeResponse?: QrCodeResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rack?: RackResolvers<ContextType>;
  RackList?: RackListResolvers<ContextType>;
  ReasonLog?: ReasonLogResolvers<ContextType>;
  ReasonLogList?: ReasonLogListResolvers<ContextType>;
  ReceiveOrder?: ReceiveOrderResolvers<ContextType>;
  ReceiveStockProduct?: ReceiveStockProductResolvers<ContextType>;
  SerializedProduct?: SerializedProductResolvers<ContextType>;
  SerializedProductList?: SerializedProductListResolvers<ContextType>;
  Shelf?: ShelfResolvers<ContextType>;
  ShelfList?: ShelfListResolvers<ContextType>;
  UnauthorizedProductDetails?: UnauthorizedProductDetailsResolvers<ContextType>;
  Uom?: UomResolvers<ContextType>;
  UomList?: UomListResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserList?: UserListResolvers<ContextType>;
  UserListPaginated?: UserListPaginatedResolvers<ContextType>;
  UserPwdUpdate?: UserPwdUpdateResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  Vendor?: VendorResolvers<ContextType>;
  VendorList?: VendorListResolvers<ContextType>;
  VendorProduct?: VendorProductResolvers<ContextType>;
  VendorProductList?: VendorProductListResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehouseList?: WarehouseListResolvers<ContextType>;
};

