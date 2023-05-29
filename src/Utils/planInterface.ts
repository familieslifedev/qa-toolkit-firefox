import type { DoorType, UploadStatuses } from "~Utils/plannerConsts";
import type { LightingSelections, LightingType, LightingUnitTypes, RangeScope } from "~Utils/plannerConsts";
import type { MeasurementEntryType, NonSpecialistMaterial, SpecialistMaterial } from "~Utils/plannerConsts";
import type {
	UnitAvailability,
	UnitCategory,
	UnitConfiguration,
	UnitHeight,
	UnitModelType,
	UnitSubCategory
} from "~Utils/plannerConsts";
import type { YesOrNo } from "~Utils/ElasticResponse";
import {
	AccessoryType,
	AmpConnectionTypes,
	BowlConfiguration,
	CutoutType,
	DepthAvailabilities,
	DrainerType,
	DrawerBoxType,
	ExtractionTypes, FrontendRoomHandle,
	FuelTypes,
	HandlePositioningGroup, infoAreaDescriptions, LightingColourType, LightingDriverType, LightingPlanModelKeys,
	LightingProductAttributes,
	MountingType,
	NoteTypes,
	ProductAttributes, ProductItemTypes,
	ProductRelationTypeHandle,
	ProductStateHandle,
	ProductSubcategories,
	RangeStateHandles, RoomLocation, ShowroomVisibilityAvailability,
	StoreHandles,
	VentilationTypes,
	WidgetGroupTypes, WorktopTabKeys,
	WorktopType
} from "~Utils/plannerConsts";


type Dictionary<T> = Record<string, T>;

export interface Plan {
	[property: string]: any;
	accountId: string | number | null;
	email?: string | null;
	leadId: string | number | null | undefined;
	title: string | null;
	planPreviewImageUid?: string;
	roomType: FrontendRoomHandle;
	basket: Basket;
	saveStatus?: UploadStatuses;
	lighting: LightingPlanModelData;
	roomProfile: RoomProfileSerializedData;
	rangesByScope: RangeHandlesByScope;
	handles?: {
		globalSku?: string;
		notRequired?: boolean;
		door?: HandlePlanModelData;
		drawer?: HandlePlanModelData;
	};
	worktopChoice: PartialWorktopTabChoices;
	worktopTabChoice: PartialWorktopTabChoices;
	timeLogs?: SerializedTimeLogs;
	items: PlanItem[];
	planNotes?: IPlanNote[];
	shouldUsePUNPriorityIndexing: boolean;
	groups?: WidgetGroupModel[];
	selectionGroups?: WidgetSelectionGroup[];
	unsuitableBelfastSinkProducts?: UnsuitableBelfastSinkProduct[];
}

export interface IPlanNote extends BaseNote, PlanNoteBorn {
}

export interface BaseNote extends BaseNoteBorn {
	noteId: number;
}

export interface PlanNoteBorn extends BaseNoteBorn {
	isHtml?: boolean;
}

export default class WidgetSelectionGroup {
	public selectionGroupId?: number;
	public widgetIds: number[];

	constructor(widgetIds: number[]) {
		this.widgetIds = widgetIds;
	}
}


export interface IProductAttributes {
	[key: string]: any;
	[LightingProductAttributes.DiffuserRequired]: YesOrNo;
	[LightingProductAttributes.DrawerLighting]?: YesOrNo;
	[LightingProductAttributes.DriverPorts]: string;
	[LightingProductAttributes.DriverType]?: LightingDriverType;
	[LightingProductAttributes.Flexible]: YesOrNo;
	[LightingProductAttributes.InteriorUnitLighting]?: YesOrNo;
	[LightingProductAttributes.LightingColour]?: LightingColourType;
	[LightingProductAttributes.LightingGroup]?: string;
	[LightingProductAttributes.MilanoProfileLighting]?: YesOrNo;
	[LightingProductAttributes.PlinthLighting]?: YesOrNo;
	[LightingProductAttributes.UnderUnitLighting]?: YesOrNo;
	[LightingProductAttributes.WattageOld]: number;
	[LightingProductAttributes.Wattage]: number;
	[ProductAttributes.ACCESSORY_TYPE]?: AccessoryType;
	[ProductAttributes.APPLIANCE_GROUP]?: string;
	[ProductAttributes.BELFAST_SINK_LAMINATE_WORKTOPS_ALLOWED]?: YesOrNo;
	[ProductAttributes.BOWL_CONFIGURATION]?: BowlConfiguration;
	[ProductAttributes.EXTRACTOR_DISTANCE_FROM_GAS_COOKING_SURFACE]?: number;
	[ProductAttributes.EXTRACTOR_DISTANCE_FROM_ELECTRIC_COOKING_SURFACE]?: number;
	[ProductAttributes.BOWL_1_EXTERNAL_LENGTH]?: string;
	[ProductAttributes.BOWL_2_EXTERNAL_LENGTH]?: string;
	[ProductAttributes.BUOH_RESTRICTIONS]?: YesOrNo;
	[ProductAttributes.BURNER_HEIGHT_FROM_FLOOR]?: string;
	[ProductAttributes.CERAMIC_HOB_RESTRICTION]?: YesOrNo;
	[ProductAttributes.CHILD_LOCK]?: YesOrNo;
	[ProductAttributes.CONNECTION_TYPE]?: AmpConnectionTypes;
	[ProductAttributes.CORE_PRODUCT]?: string;
	[ProductAttributes.CONTROL_POSITION]?: string;
	[ProductAttributes.CUTOUT_DEPTH]?: string;
	[ProductAttributes.CUTOUT_WIDTH]?: string;
	[ProductAttributes.CUTOUT_TYPE]?: CutoutType;
	[ProductAttributes.DOOR_SPLIT]: string;
	[ProductAttributes.DOWNDRAFTHOOD_FASCIA_DEPTH]: string;
	[ProductAttributes.DRAINER_CONFIGURATION]?: DrainerType;
	[ProductAttributes.DRAWER_BOX_TYPE]?: DrawerBoxType;
	[ProductAttributes.DEPTH_AVAILABILITIES]?: DepthAvailabilities;
	[ProductAttributes.ENERGY_RATING]?: string;
	[ProductAttributes.EXTRACTION_TYPE]?: ExtractionTypes.Ducted | ExtractionTypes.Recirculated | ExtractionTypes.DuctedAndRecirculated;
	[ProductAttributes.FINISH]?: string;
	[ProductAttributes.FUEL_TYPE]?: FuelTypes.Dual | FuelTypes.Electric | FuelTypes.Gas | FuelTypes.Oil;
	[ProductAttributes.GAS_HOB_RESTRICTION]?: YesOrNo;
	[ProductAttributes.GRILL]?: YesOrNo;
	[ProductAttributes.GUARANTEE]?: string;
	[ProductAttributes.HANDLE_POSITIONING_GROUP]?: HandlePositioningGroup;
	[ProductAttributes.INDUCTION_HOB_RESTRICTION]?: YesOrNo;
	[ProductAttributes.INSTALLATION_DEPTH]?: number;
	[ProductAttributes.INTERGRATED_HANDLE_COLOUR]?: string;
	[ProductAttributes.INDUSTRIAL_APPLIANCE_APERTURE_RESTRICTIONS]?: YesOrNo;
	[ProductAttributes.LARGE_DELIVERY_ITEM]?: string;
	[ProductAttributes.NUMBER_OF_HOBS_OR_BURNERS]?: string;
	[ProductAttributes.NOISE_LEVEL]?: string;
	[ProductAttributes.MINIMUM_TAP_REACH_REQUIRED_MM]?: string;
	[ProductAttributes.MOUNTING_TYPE]?: MountingType;
	[ProductAttributes.OVEN_TYPE]?: string;
	[ProductAttributes.PATTERNED_WORKTOPS]?: YesOrNo;
	[ProductAttributes.POINT_OF_INTEREST]?: YesOrNo;
	[ProductAttributes.PLANNER_CATEGORY]?: string;
	[ProductAttributes.PLINTH_CUT_OUT_REQUIRED]?: YesOrNo;
	[ProductAttributes.PRODUCT_MATERIAL]?: string;
	[ProductAttributes.RANGE_COOKER_VOID]?: number;
	[ProductAttributes.RESTRICT_REMOVAL_FROM_BASKET]?: string;
	[ProductAttributes.RETAIL_CAPTION]?: string;
	[ProductAttributes.SPECIAL_ORDER_PRODUCT]?: YesOrNo;
	[ProductAttributes.SPECIALIST_WORKTOP_RESTRICTIONS]?: YesOrNo;
	[ProductAttributes.SUPPORT_TYPE]?: string;
	[ProductAttributes.TAP_HOLES_REQUIRED]?: string;
	[ProductAttributes.TAP_HOLES]?: string;
	[ProductAttributes.TAP_REACH_MM]?: string;
	[ProductAttributes.UNAVAILABLE_WITH_RECESSED_DRAINER]?: YesOrNo;
	[ProductAttributes.UNSUITABLE_FOR_CERAMIC]?: string;
	[ProductAttributes.UNSUITABLE_FOR_BELFAST_SINKS]?: string;
	[ProductAttributes.CUT_OUT_TO_WALL_DISTANCE]?: string;
	[ProductAttributes.VENTILATION_TYPE]?: VentilationTypes.Vented | VentilationTypes.Condenser;
	[ProductAttributes.WARRANTY_LABOUR]?: string;
	[ProductAttributes.WARRANTY_PARTS]?: string;
	[ProductAttributes.WASTE_HOLES]?: string;
}


export interface UnsuitableBelfastSinkProduct {
	productName: string;
	productId: number;
	itemId?: number;
	attributes?: IProductAttributes;
}
export interface ICustomNote {
	note: string;
	editable?: boolean;
	static?: boolean;
	hasWidget?: boolean;
	noteWidgetId?: number;
}
export interface BaseNoteBorn extends AcceptableNote, ICustomNote {
	id: string;
	note: string;
	noteType: NoteTypes;

	order?: number;

	alertMessage?: string;
	dateOfStatusUpdate?: string;
	isAcceptable?: boolean;
	itemId?: number;
	itemIds?: number[];
	shouldShownOnCanvas?: boolean;
	needCombine?: boolean;
}

export interface AcceptableNote {
	id: string;
	noteType: NoteTypes;
	accepted?: boolean;
}

export interface WidgetGroupModel {
	groupId?: number;
	items: WidgetGroupItemModel[];
	widgetGroupType: WidgetGroupTypes;
}

export interface WidgetGroupItemModel {
	itemId: number;
	relativePosition: SerializedVector2D;
	relativeRotation: number;
	relativeDistanceFromFloor: number;
	skipInUndoModel: boolean;
}


export type PlanItem = WidgetModel & WithItemId;
export interface WithItemId {
	itemId: number;
}





export interface WidgetModelAttributes {
	door?: DoorType;
	hinge?: DoorType;
	style?: string;
	type?: string;
	subType?: string;
	category?: string;
	integrated?: string | boolean;
	identifier?: string;
	halfBowl?: string;
	bowl?: string;
	drainer?: string;
	handing?: string;
	previewCacheKey?: string;
	legacyIdentifier?: string | null;
	placeholder?: string;
	oldWidget?: string;
	widget?: string;
	iconType?: string;
	newOverhangCurves?: boolean;
	rotation?: number;
	genericType?: string;
	doorWidth?: number;
	defaultWallOffset?: number;
	unitLabel?: string;
	applianceDoorOption?: string;
	isApplianceConfigurable?: boolean;
	industrialConfigurationId?: string;
	burnerHeightFromFloor?: number;
	isOutlet?: boolean;
	newSideVoids?: boolean;
	aligningDisabled?: boolean;
	isAccessoriesTabNeeded?: boolean;
	handle?: string;
	noPlanZoneDepth?: number;
	isSinglePost?: boolean;
	frameWidth?: number;
	customDecorHeight?: number;
	polished?: string;
}

export interface IDimensions {
	width: number;
	height: number;
	depth: number;
	secondaryHeight?: number;
	secondaryWidth?: number;
}

export interface CornerDimension {
	width: number;
	depth: number;
}

export interface VoidDimension {
	width: number;
	fullWidth: number;
}
export interface WidgetModel {
	title?: string;
	roomLocation?: RoomLocation;
	isPelmetRemoved?: boolean;
	justBorn?: boolean;
	oRotY?: number;
	bRotY?: number;
	name?: string;
	handle?: string;
	category?: string | null;
	categories?: string[];
	type?: string | null;
	attributes: WidgetModelAttributes;
	widgetReplaced?: boolean;
	spawnedAsClone?: boolean;
	position: {
		x?: number | null;
		y?: number | null;
		z?: number | null;
	};
	dimensions: IDimensions;
	defaultDimensions?: IDimensions;
	itemDimensions?: {
		width: number;
		height: number;
		depth: number;
	};
	cornerDimensions?: CornerDimension;
	voidDimensions?: CornerDimension | VoidDimension;
	actualWidth?: number;
	offsetToTopLeftCorner?: {
		x: number;
		y: number;
		z: number;
	};
	itemId?: number;
	snap?: any;
	topSnap?: TopSnap;
	max?: {
		width?: number;
		depth?: number;
	};
	min?: {
		width?: number;
		depth?: number;
	};
	sideElevationLabel?: string;
	sideRotation?: number;
	relativeSideElevationWallPosition?: string | null;
	parentStepHandle?: string | null;
	range?: string | null;
	colour?: string | null;
	customColour?: CustomColour | null;
	frontalCustomisationData?: FrontalCustomisationData;
	groupCreationInProgress?: boolean;
	notRequiredGroups?: NotRequiredGroups;
	configuredProducts?: ConfiguredProducts;
	measurements?: MeasurementsConfirmationModel;
	productId?: number | null;
	productIds?: number[] | null;
	material?: TableTopMaterial | string;
	unitQuery?: UnitQuery;
	selectedStyle?: string;
	queryHeight?: number;
	rotation?: number;
	areDimensionsCustomized?: boolean;
	temporary?: boolean;
	hasWindowsill?: true;
	childrenModels?: any[];
	archwayShape?: string;
	sideVoidWidth?: number;
	legacyIdentifier?: string;
	furnitureMaterial?: string;
	style?: string;
	behindCornerPostDimensions?: {
		depth: number;
		height: number;
		width: number;
	};
	isAutoDecor?: boolean;
	enableDecorEndBehindCornerPost?: boolean;
	autoPositionedOnSpawn?: boolean;
	shouldSnapByHeight?: boolean;
	snappedHeight?: number;
	wallOffset?: number;
	wallOffsetManuallyChanged?: boolean;
	isProduct?: boolean;
	isFreestandingApplianceFillerPanel?: boolean;
	widget?: string;
	autoSpawned?: boolean;
	preparingForScreenshot?: boolean;
	applianceDoorRange?: string | null;
	recommendedItems?: PastedRecommendedProduct[];
	distanceFromFloor?: number;
	pasted?: boolean;
	iconName?: string;
	categoryMapId?: number;
	selectedElectricalId?: number | null;
	noteUuid?: string;
	noteText?: string;
	onGhostLayer?: boolean;
	worktop?: WorktopData | Partial<WindowsillWorktopData> | UpstandWorktopData;
	unitDefId?: number;
	hingeOption?: string;
	doorOption?: string;
	short?: boolean;
	kneeDrawerDecor?: boolean;
	ignorePelmet?: boolean;
	ignoreCornice?: boolean;
	isDoorWithArchitrave?: boolean;
	product?: PlanItemProduct | BedProduct;
	products?: Dictionary<number> | number[];
	applianceDoor?: string;
	alertHandle?: string;
	ranges?: RangeHandles | null;
	alertParam?: string;
	polygon?: SerializedVector3D[][] | SerializedVector2D[];
	errors?: string[];
	interiorConfig?: CooksPantryInteriorConfig;
}

export const WorktopConfigId = {
	WorktopConfig: Symbol('WorktopConfig'),
	WorktopMaterialsData: Symbol('WorktopMaterialsData'),
	ProvenceWorktopMaterialsData: Symbol('ProvenceWorktopMaterialsData'),
	WindowsillWorktopMaterialsData: Symbol('WindowsillWorktopMaterialsData'),
	WorktopUnderside: Symbol('WorktopUnderside'),
	WorktopCornerPrices: Symbol('WorktopPrices'),
	DeprecatedSpecialistMaterials: Symbol('DeprecatedSpecialistMaterials'),
	SpecialistIslandMaterialsData: Symbol('SpecialistIslandMaterialsData'),
	WorktopProfileData: Symbol('WorktopProfileData'),
	WorktopColoursData: Symbol('WorktopColoursData'),
	WorktopsOverhangConfig: Symbol('WorktopsOverhangConfig'),
};

export interface PlanItemProduct {
	attributes?: { [key: string]: string | number };
}
export interface SerializedVector2D {
	x: number;
	z: number;
}

export interface SerializedVector3D {
	x: number;
	y: number;
	z: number;
}
export interface UpstandWorktopData {
	title: string;
	material: string;
	module: {
		w: number;
		d: number;
		h: number;
		material: string;
		colour: string;
		surfaceColour: string;
		curve: [number, number, number, number];
		allowOffCut?: boolean;
		availableWidth?: number;
	};
	worktopType: string;
	surfaceColour: string;
	heightSnapDisabled?: boolean;
	offcutLabelIndex?: number;
	offcutSubIndex?: number;
}

export interface BedProduct {
	isPlaceholder: boolean;
	productCategory: string;
	dimensions: WidgetDimensions;
	displayName: string;
}

export interface WidgetDimensions {
	width: number;
	depth: number;
	height: number;
}
export interface WindowsillWorktopData extends Partial<WorktopData> {
	isNotRequired?: boolean;
	offcutLabelIndex?: number;
	offcutSubIndex?: number;
	worktopType?: WorktopType;
	material?: string | null;
	surfaceColour?: string | null;
	edgeProfile?: string | null;
	selectedHeight?: WorktopThickness | null;
	depth?: number;
}
export interface WorktopData {
	title: string;
	productId?: number | null;
	offcutLabelIndex?: number | null;
	offcutSubIndex?: number | null;
	edgeProfile?: string | null;
	selectedHeight?: WorktopThickness | null;
	module: WorktopModule;
	material: string | null | undefined;
	surfaceColour: string | null | undefined;
	edgeColour?: string | null;
	worktopType: WorktopType | null;
	category?: string;
	subCategory?: string;
	overhang?: {
		maximumOverhangForStandartHeightOrAbove?: number | null;
		minimumOverhangForStandartHeightOrAbove?: number | null;
		minimumOverhangLessThanStandartHeight?: number | null;
	};
	disableCornerAdjusments?: boolean;
	preventInnerSnapping?: boolean;
}
export interface CooksPantryInteriorConfig {
	shelvingUnit: BasketUnit;
	drawingUnit: BasketUnit;
	worktopObject: WorktopObject;
	colourRange: ColourWithRanges;
	totalPrice: ListAndPromoPrice;
}

export interface ListAndPromoPrice {
	listPrice: number;
	promoPrice: number;
}
export interface ColourWithRanges {
	frontalRangeHandle: string;
	carcaseRangeHandle: string;
	colour: string;
	stateHandle?: SemiRetiredStateHandles | RangeStateHandles;
}

export type SemiRetiredStateHandles = RangeStateHandles.Active | RangeStateHandles.SemiRetired | RangeStateHandles.BothActiveAndSemiRetired;


export interface WorktopObject {
	dimensions: { width: number; depth: number; height: number };
	worktop: {
		productId: number;
		title: string;
		material: string;
		surfaceColour: string;
		edgeColour: string;
	};
}
export interface BasketUnit {
	unitId: number;
	unitDefId: number;
	customColour?: string;
	displayNumber: number;
	itemId: number;
	hinge: string | null | undefined;
	door: string | null;
	ranges: RangeHandles;
	frontalCount: number;
	extraUnits?: BasketUnit[];
	quartzWorktop?: BasketWorktop;
	customerSuppliedWorktop?: BasketWorktop;
	products?: {
		[index: string]: number;
	};
}

export interface BasketWorktop {
	material: string;
	quantity: number;
	colour: string;
	edge: {
		profile: string;
		lengthMm: number;
	};
	processes: WorktopProcesses[];
	dimensions: {
		width: number;
		length: number;
		depth?: number;
	};
	supports?: {
		required: number;
		configured: number;
	};
	label: string;
	type?: string;
}

export interface WorktopProcesses {
	process: string;
	quantity: number;
	material?: string;
	length?: number;
}

export interface WorktopModule {
	category?: string;
	material?: string;
	resizeable?: boolean;
	allowOffCut?: boolean | string;
	availableWidth?: number;
	availableDepth?: number;
	curve?: number[];
	maxWidth?: number;
	maxDepth?: number;
	w: number;
	h: number;
	d: number;
}

export interface UnitQuery {
	widthMm?: number;
	heightMm?: UnitHeight;
	depthMm?: number;
	unitConfiguration?: UnitConfiguration;
	menuQuery?: SubstepUnitQuery | SubstepUnitQuery[];
}

export interface SubstepUnitQuery {
	category: UnitCategory;
	subCategory: UnitSubCategory;
	unitConfiguration?: UnitConfiguration;
	unitType?: UnitModelType;
	attributes?: Attributes;
	availability?: UnitAvailability;
}

export interface Attributes {
	['Feature Unit']?: YesOrNo;
	['Bin Unit']?: YesOrNo;
}

export interface UnitHeightsConfig {
	wallUnitHeights: number[];
	towerUnitHeights: number[];
}

export type TableTopMaterial = SpecialistMaterial | NonSpecialistMaterial | null;

export interface MeasurementsConfirmationModel {
	dimension: MeasurementEntryType[];
	position: MeasurementsPositionConfirmationModel[];
}

interface MeasurementsPositionConfirmationModel {
	direction: { x: number; y: number; z: number };
	target: number;
	distance: number;
}

export interface TopSnap {
	normal: {
		x: number;
		z: number;
	};
	targetId: number;
}

export type ConfiguredProducts = Record<number, ConfiguredProduct>;

export interface ConfiguredProduct {
	autoAdded?: boolean;
	product: IProduct;
	quantity: number;
}

export interface IProduct extends ProductInfo, ProductPrices {
}

export interface ProductPrices {
	listPrice: Price;
	promoPrice: Price;
	costPerMeterSquared?: Price;
	discountValue?: DiscountValue;
	discountedOrderPrice?: Price;
	discountedPrice: Price;
}

export interface Price {
	gross?: number;
	display: number;
}

export interface DiscountValue {
	display: number;
}

export interface NameHandlePair {
	name: string;
	handle: string;
}

export interface ProductSubcategory {
	name: ProductSubcategories;
	handle: string;
}

interface RetailStoreData {
	handle: StoreHandles;
	name: string;
}

export interface ProductRelation {
	productCode: string;
	productId: number;
	relationTypeHandle: ProductRelationTypeHandle;
	quantity: string;
	productDescription?: string;
	retailCategoryHandle?: string;
	retailSubCategoryHandle?: string;
}

export interface ProductInfo {
	productId: number;
	productName: string;
	defaultImageId?: number | string;
	defaultImageUrl: string;
	descriptions: ProductDescriptionsType;
	productFlags: NameHandlePair[];
	productLongDescription: string;
	title: string;
	productCode: string;
	retailSubCategory: ProductSubcategory;
	retailCategory: NameHandlePair;
	retailStore: RetailStoreData;
	productStateHandle: ProductStateHandle;
	bestSellerFlag: string;
	withLights: string;
	isDiscounted: boolean;
	promotionType: string;
	productRelations: ProductRelation[];
	productStyle?: {
		name: string;
	};
	productImageUrls: IProductImageUrls[];
	productImages: ProductImage[];
	attributes: IProductAttributes;
	attributesIntegers: ProductAttributesIntegers;
	productShape?: string;
	productColour?: NameHandlePair;
	plannerColour: NameHandlePair;
	edgeColour?: NameHandlePair;
	manufacturer: string;
	manufacturerPartNumber: string;
	technicalSpecificationUrl: string | null;
	widthMm: number;
	heightMm: number;
	depthMm: number;
	minCustomLengthMm?: number;
	isPlaceholder: boolean;
	isExpressDelivery: boolean;
	retailCaptionName: string;
	discountType?: string;
	availableFrontalRangeCollectionHandles: RangeHandle[] | null;
	leadTimeDays?: number;
	productMaterial?: ProductMaterial;
	isIncompatible?: boolean;
	showOnTradePlanner?: boolean;
	showOnRetailPlanner?: boolean;
	priceMatches: PriceMatches[];
	showroomVisibility: ShowroomVisibility[];
	productDetail?: string;
	packQuantity: number;
}

type RangeHandle = string;

interface ProductMaterial {
	name: string;
	handle: string;
}
export interface PriceMatches {
	retailer: string;
	price: {
		grossValue: number;
		netValue: number;
	};
}

export interface ShowroomVisibility {
	code: string;
	name: string;
	availability: ShowroomVisibilityAvailability;
}
export interface ProductAttributesIntegers {
	[key: string]: number | undefined;
	'Backwards Lever Reach'?: number;
	[ProductAttributes.BURNER_HEIGHT_FROM_FLOOR]?: number;
	'Capacity (L)'?: number;
	'Counter Top Appliance Restrictions'?: number;
	'Cutout Depth (mm)'?: number;
	'Cutout Width (mm)'?: number;
	'Downdraft Fascia Depth (mm)'?: number;
	'Installation Depth'?: number;
	'Cut Out to Wall Distance'?: number;
	'Manufacturing Lead Time'?: number;
	'Minimum Worktop Thickness Required (mm)'?: number;
	'Number of Zones/Burners'?: number;
	'Noise Level (dB)'?: number;
	'Safety Zone A'?: number;
	'Safety Zone B'?: number;
	'Safety Zone C'?: number;
	'Safety Zone D'?: number;
	'Safety Zone E'?: number;
	'Sink Cut-Out Depth (mm)'?: number;
	'Warranty - Labour'?: number;
	'Warranty - Parts'?: number;
	[LightingProductAttributes.DriverPorts]: number;
}

interface ProductImage {
	imageId: number;
}

export interface IProductImageUrls {
	imageUrl: string;
	image120Url: string;
	image440Url: string;
	image500Url: string;
	image800Url: string;
}

export interface PastedRecommendedProduct extends BasketWidgetProduct {
	productId: number;
}
export interface NotRequiredGroups {
	legsOnceWereRemovedFromBasket?: boolean;
	supportLegsNotRequired?: boolean;
	tableBasesNotRequired?: boolean;
	edgeBandingAnnotationNotRequired?: boolean;
	additionalEdgeBandingNotRequired?: boolean;
	additionalEdgeBandingProductsChecked?: boolean;
}
export interface CustomColour {
	id: number;
	handle: string;
	name: string;
	carcaseColour: string;
	substrateType?: string;
	hex: string;
	colourCode: string;
	rgb: string;
}


export type SerializedTimeEntry = Array<[Step, SerializedStepTime]>;
export type SerializedTimeLogs = Array<[PlanState, SerializedTimeEntry]>;

export type SerializedStepTime = {
	totalTime: TotalTime;
	subStepTimes?: Array<[SubStepName, SerializedSubStepTime]>;
};

export interface HandlePlanModelData {
	productCode: string;
	productId?: number;
	productName?: string;
}

export interface PlanState {
	leadState: string;
	user: string;
	date: string;
}

export interface StepTime {
	totalTime: TotalTime;
	subStepTimes?: Map<SubStepName, SubStepTime>;
}

export type TotalTime = number;

export type Step = string;
export type SerializedSubStepTime = SubStepTime;
export type SubStepName = string | null;

export interface SubStepTime {
	time: number;
}


export type PartialWorktopTabChoices = planner.NullablePartial<WorktopTabChoices & LegacyWorktopTabChoices>;
export interface WorktopTabChoices {
	[WorktopTabKeys.Material]: string;
	[WorktopTabKeys.SurfaceColour]: string;
	[WorktopTabKeys.EdgeColour]: string;
	[WorktopTabKeys.Thickness]: WorktopThicknessObject;
	[WorktopTabKeys.Profile]: ProfileData;

	[WorktopTabKeys.TimberAreaSurfaceColour]: string;
	[WorktopTabKeys.TimberAreaThickness]: WorktopThickness;
	[WorktopTabKeys.TimberAreaProfile]: ProfileData;
}

export interface LegacyWorktopTabChoices {
	material: string;
	surfaceColour: string;
	edgeColour: string;
	thickness: WorktopThicknessObject;
	profile: ProfileData;

	timberAreaSurfaceColour: string;
	timberAreaThickness: WorktopThickness;
	timberAreaProfile: ProfileData;
}



export interface ProfileData {
	displayName: string;
	handle: string;
	photoHandle?: string;
}

export interface WorktopThicknessObject {
	displayName: string;
	heightMm: WorktopThickness;
}
export type WorktopThickness = number | number[];


export interface Basket {
	relatedProducts: BasketRelatedProducts;
	extras: Dictionary<number>;
	products: Dictionary<number>;
	productsOnPlan: Dictionary<number>;
	autoAdded: Dictionary<boolean>;
	configured: Dictionary<Dictionary<number>>;
	widgetProducts: Dictionary<BasketWidgetProduct[]>;
	productItems: Record<string, ProductCustomization[]>;
	extrasCustomizations: Record<string, ProductCustomization[]>;
	productCustomizations: Record<string, ProductCustomization[]>;
}

export interface BasketRelatedProducts {
	[productId: string]: {
		[relatedProductId: string]: {
			quantity?: number;
			recommendedQuantity: number;
			totalAddedQuantity: number;
		};
	};
}

export interface BasketWidgetProduct {
	quantity: number;
	itemId: number;
	isRecommended: boolean;
}

export interface ProductCustomization {
	type: ProductItemTypes;
	customization: Customization;
	quantity: number;
}



export interface Customization {
	displayNumber?: string | number;
	customColour?: string | null;
	frontalCustomisation?: FrontalCustomisationData;
}

export interface FrontalCustomisationData {
	handlePosition?: string;
	hingeOption?: string;
}

export interface LightingPlanModelData {
	[LightingPlanModelKeys.UnitLighting]: Record<LightingType, IUnitLighting>;
	[LightingPlanModelKeys.LightingSelections]?: Record<LightingType, Record<LightingSelections, string>>;
	[LightingPlanModelKeys.ThroughSubMenusLightingType]: LightingType;
	[LightingPlanModelKeys.RunQuantities]: SavedLightingBlockRun[];
}



export type IUnitLighting = {
	[key in LightingUnitTypes]: LightingToggle;
};
export interface LightingToggle {
	checked: boolean;
}

export interface SavedLightingBlockRun {
	start: number[];
	end: number[];
	quantity: number;
	widgetIds: number[];
	type: LightingType;
}

export interface RoomProfileSerializedData {
	graph: SerializedGraph;
	measurements: SerializedMeasurements;
	shapeMeasurements: SerializedRoomShapeOptions;
	floorId?: number;
	ceilingId?: number;
}

export interface SerializedGraph {
	breakpoints: SerializedBreakpoint[];
	points: SerializedPoint[];
	edges: SerializedEdges;
}

type SerializedPoint = [
	number, // x
	number, // z
	[number, number]?, // parentPoint
];

export type SerializedBreakpoint = [
	number, // x
	number, // y
];

export type ProductDescriptionsType = {
	[key in InfoAreaDescriptionType]: string;
};

export type InfoAreaDescriptionType = typeof infoAreaDescriptions[number];



interface SerializedEdges {
	[startPointIndex: string]: {
		[endPointIndex: string]: {
			thickness: number;
		};
	};
}
export interface SerializedMeasurements {
	confirmedRoomHeight: number | undefined;
	unconfirmedLengths: SerializedAnchorGroup[];
	unconfirmedThicknesses: number[];
	unconfirmedPositions: SerializedAnchorGroupPosition[];
}
export type SerializedAnchorGroup = number[];
type SerializedAnchorGroupPosition = [SerializedAnchorGroup, number[]];

export interface SerializedRoomShapeOptions {
	name?: keyof ShapeDimensions;
	rotation?: number;
	runLengthsMeasurements: UserSetRunLengthMeasurements[];
}

export interface ShapeDimensions {
	alcove: Dictionary<number>;
	square: Dictionary<number>;
	split: Dictionary<number>;
	angled: Dictionary<number>;
	LShape: Dictionary<number>;
}

export interface UserSetRunLengthMeasurements {
	label: string;
	length: number;
}


export type RangeHandlesByScope = {
	[key in RangeScope]: RangeHandles;
};

export interface RangeHandles {
	frontal: string | null;
	carcase: string | null;
	drawerbox: string | null;
}

declare namespace planner {
	type NullablePartial<T> = { [K in keyof T]?: T[K] | null };
	type Parameters<T> = T extends (...args: infer P) => any ? P : never;
	type RecursivePartial<T> = {
		[P in keyof T]?: T[P] extends Array<infer U> ? Array<RecursivePartial<U>>
			: T[P] extends object ? RecursivePartial<T[P]>
				: T[P];
	};
	type Merge<T, R> = Omit<T, keyof R> & R;
	type Required<T> = { [P in keyof T]-?: T[P] };

	// IntersectionValuesOf<['a', 'c'], {
	//     a: { foo: number },
	//     b: { bar: number },
	//     c: { quux: number }
	// }> = { foo: number } & { quux: number }
	type IntersectionValuesOf<Keys extends keyof Type, Type extends object> = UnionToIntersection<Type[Keys]>;

	// UnionToIntersection<{ a: string } | { b: number }> = { a: string } & { b: number }
	type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

	// ValuedKeyOf<{ a: number, b: string, c: number }, number> = 'a' | 'c'
	// Reimplement with key remapping in TS4.1
	type ValuedKeyOf<Type, Value, _Picked = PickByValue<Type, Value>> = NonNullable<
		{
			[I in keyof _Picked]: _Picked[I] extends never ? never : I;
		}[keyof _Picked]
	>;
	type PickByValue<Type, Value> = { [I in keyof Type]-?: Type[I] extends Value ? Type[I] : never };

	type FunctionKeyOf<T, U = Required<T>> = {
		[K in keyof U]: U[K] extends ((...args: any[]) => any) ? K : never;
	}[keyof U];

	// MaybeEmpty<{ foo: string, bar: number }>
	//     = { foo: undefined, bar: undefined } | { foo: string, bar: number }
	type MaybeEmpty<T> = T | { [K in keyof T]: undefined };
	type Constructable<T> = new(...args: any[]) => T;
	type Mixin<B, M> = <T extends Constructable<B>>(SuperClass: T) => T & Constructable<M>;
}