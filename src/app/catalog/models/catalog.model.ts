export interface CatalogFilter {
  name: string;
  key: string;
  facets: Facet[];
  relatedValue?: string;
  partOf?: string;
}

export interface Facet {
  name: string;
  relatedValue?: string;
}
