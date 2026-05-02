/** Types for catalog template - content management */

export interface CatalogData {
  id: string;
  meta: CatalogMeta;
  hero: HeroData;
  overview: OverviewData;
  gallery: GalleryData;
  variants: VariantsData;
  dimensions: DimensionsData;
  materials: MaterialsData;
  features: FeaturesData;
  assembly: AssemblyData;
  productCodes: ProductCodesData;
  packshots?: PackshotsData;
  sections?: SectionConfig[];
}

export type CatalogLayoutType = 'qx' | 'type2' | 'type3';

export interface CatalogMeta {
  title: string;
  description: string;
  brandName: string;
  collectionName: string;
  layoutType: CatalogLayoutType;
  theme?: string;
}

export interface HeroSliderConfig {
  /** Enable auto-advance to next slide */
  autoAdvance?: boolean;
  /** Interval in milliseconds between slides */
  interval?: number;
  /** Pause auto-advance when user hovers over slider */
  pauseOnHover?: boolean;
  /** Transition duration in milliseconds */
  transitionMs?: number;
  /** Show prev/next arrow buttons */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Initial slide index (0-based) */
  initialSlide?: number;
}

export type HeroDescriptionPosition =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

export interface HeroDescriptionStyleConfig {
  /** Turn slide descriptions on/off for this catalog */
  enabled?: boolean;
  /** Placement preset for the description label */
  position?: HeroDescriptionPosition;
  /** Distance from top or bottom edge (in px) */
  offsetPx?: number;
  /** Text color (CSS color value) */
  textColor?: string;
  /** Label background (CSS color value) */
  backgroundColor?: string;
  /** Backdrop blur (in px) */
  backdropBlurPx?: number;
  /** Horizontal padding (in px) */
  paddingX?: number;
  /** Vertical padding (in px) */
  paddingY?: number;
  /** Corner radius (in px) */
  borderRadiusPx?: number;
  /** Font size (in px) */
  fontSizePx?: number;
  /** Font weight */
  fontWeight?: number;
  /** Letter spacing in em units */
  letterSpacingEm?: number;
  /** Max width, e.g. 90vw or 520px */
  maxWidth?: string;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Uppercase transform toggle */
  uppercase?: boolean;
}

export interface HeroSlideContentOverrides {
  /** Optional small label above the main hero title */
  brandLabel?: string;
  /** Optional main hero title override */
  collectionName?: string;
  /** Optional primary hero copy override */
  tagline?: string;
  /** Optional secondary hero copy override */
  taglineLine2?: string;
  /** Optional CTA label override */
  ctaLabel?: string;
}

export type HeroAnchor =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type HeroCtaPosition = 'inline' | 'floating' | 'none';

export interface HeroSlideContentLayout {
  /** Where the text block anchors inside the viewport */
  anchor?: HeroAnchor;
  /** Text alignment within the block */
  textAlign?: 'left' | 'center' | 'right';
  /** Max width of text block (any CSS length, e.g. "32rem", "60vw", "1440px") */
  maxWidth?: string;
  /** Horizontal padding from screen edge (any CSS length) */
  paddingX?: string;
  /** Vertical padding from top/bottom edge (any CSS length) */
  paddingY?: string;
  /** Override main hero text color (CSS color) */
  textColor?: string;
  /** Override secondary text color (brand label + taglineLine2) */
  secondaryTextColor?: string;
  /** Title font-size (any CSS length, supports clamp(), e.g. "clamp(3rem, 8vw, 7rem)") */
  titleFontSize?: string;
  /** Title font-weight (numeric) */
  titleFontWeight?: number;
  /** Title line-height (any CSS value, e.g. "0.9") */
  titleLineHeight?: string;
  /** Title letter-spacing (any CSS value, e.g. "-0.02em") */
  titleLetterSpacing?: string;
  /** Tagline (primary copy) font-size */
  taglineFontSize?: string;
  /** Second-line tagline font-size */
  taglineLine2FontSize?: string;
  /** Brand label font-size */
  brandLabelFontSize?: string;
  /** CTA placement: inline (after tagline), floating (absolute), or none (hide CTA on this slide) */
  ctaPosition?: HeroCtaPosition;
  /** Floating CTA distance from viewport bottom (any CSS length) */
  ctaFloatingBottom?: string;
  /** Vertical lift of the whole content block (any CSS transform value, e.g. "-8rem") */
  contentLift?: string;
}

export interface HeroSlide {
  /** Resolved image URL */
  src: string;
  /** Accessible slide alt text */
  alt: string;
  /** Optional visible caption/description */
  description?: string;
  /** Optional per-slide override for the main hero copy */
  heroContent?: HeroSlideContentOverrides;
  /** Optional per-slide override for description placement and style */
  descriptionStyle?: HeroDescriptionStyleConfig;
  /** Optional per-slide layout/geometry override */
  contentLayout?: HeroSlideContentLayout;
}

export interface HeroSlideDefinition {
  /** Relative path inside hero folder, e.g. hero_00.webp */
  image: string;
  /** Optional alt override for the slide */
  alt?: string;
  /** Optional visible caption/description for the slide */
  description?: string;
  /** Optional per-slide override for the main hero copy */
  heroContent?: HeroSlideContentOverrides;
  /** Optional per-slide override for description placement and style */
  descriptionStyle?: HeroDescriptionStyleConfig;
  /** Optional per-slide layout/geometry override */
  contentLayout?: HeroSlideContentLayout;
}

export interface HeroSliderFile {
  /** Slider settings stored in hero/slider.json */
  settings?: HeroSliderConfig;
  /** Description label style stored in hero/slider.json */
  descriptionStyle?: HeroDescriptionStyleConfig;
  /** Explicit list of slides for the hero carousel */
  slides?: HeroSlideDefinition[];
}

export interface HeroData {
  brandLabel: string;
  collectionName: string;
  tagline: string;
  taglineLine2?: string;
  ctaLabel: string;
  heroImage: string;
  heroImageAlt: string;
  /** Explicit hero slides resolved from hero/slider.json */
  heroSlides?: HeroSlide[];
  /** Auto-discovered hero_NN.webp images for slider, with jpg/jpeg/png fallback */
  heroImages?: string[];
  /** Slider options loaded from hero/slider.json (or legacy hero content) */
  slider?: HeroSliderConfig;
  /** Description label style loaded from hero/slider.json */
  descriptionStyle?: HeroDescriptionStyleConfig;
}

export interface OverviewData {
  sectionLabel: string;
  title: string;
  titleLine2?: string;
  paragraphs: string[];
  packshotImage: string;
  packshotImageAlt: string;
  packshotCaption: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface GalleryData {
  sectionLabel: string;
  title: string;
  images: GalleryImage[];
}

export interface ColorOption {
  name: string;
  code: string;
  ral?: string;
}

export interface SizeOption {
  label: string;
  desc: string;
}

export interface ComparisonRow {
  feature: string;
  basic: string;
  premium: string;
}

export interface VariantsData {
  sectionLabel: string;
  title: string;
  description?: string;
  desktopColors: ColorOption[];
  frameColors: ColorOption[];
  sizes: SizeOption[];
  previewImage: string;
  comparisonTable: ComparisonRow[];
  comparisonBasicLabel?: string;
  comparisonPremiumLabel?: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface DimensionsData {
  sectionLabel: string;
  title: string;
  description?: string;
  specs: SpecItem[];
  certifications: string[];
  dimensionDiagram?: {
    width: string;
    depth: string;
    heightRange: string;
  };
}

export interface MaterialItem {
  name: string;
  desc: string;
  specs: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface MaterialsConfiguratorOption {
  id: string;
  code: string;
  label: string;
  image: string;
  thumbnail: string;
}

export interface MaterialsConfiguratorData {
  frameOptions: MaterialsConfiguratorOption[];
  desktopOptions: MaterialsConfiguratorOption[];
}

export interface MaterialsData {
  sectionLabel: string;
  title: string;
  description?: string;
  materials: MaterialItem[];
  swatches: ColorSwatch[];
  detailImage: string;
  detailImageAlt: string;
  detailImageCaption: string;
  configurator?: MaterialsConfiguratorData;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FeaturesData {
  sectionLabel: string;
  title: string;
  items: FeatureItem[];
}

export interface AssemblyStep {
  step: number;
  title: string;
  desc: string;
}

export interface AssemblyData {
  sectionLabel: string;
  title: string;
  steps: AssemblyStep[];
  ctaLabels: {
    quote: string;
    pdf: string;
    contact: string;
  };
  footerText: string;
  versionInfo: string;
}

export type ProductCodeGroupCategory = 'single' | 'bench' | 'manager';

export interface ProductCodeRow {
  index: string;
  indexR: string;
  dimensions: string;
}

export interface ProductCodeGroup {
  id: string;
  category: ProductCodeGroupCategory;
  title: string;
  rows: ProductCodeRow[];
}

export interface ProductCodesData {
  sectionLabel: string;
  title: string;
  description: string;
  groups: ProductCodeGroup[];
}

export interface SectionConfig {
  id: string;
  label: string;
  enabled?: boolean;
}

export interface PackshotItem {
  code: string;
  colorName: string;
  colorCode?: string;
  colorHex?: string;
  image: string;
}

export interface PackshotGroup {
  model: string;
  label: string;
  desc?: string;
  items: PackshotItem[];
}

export interface PackshotsData {
  sectionLabel: string;
  title: string;
  subtitle?: string;
  groups: PackshotGroup[];
}
