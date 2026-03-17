export type GeoType = 'root' | 'region' | 'range' | '山' | '寨' | '地' | '梁';

export interface OriginNode {
  name: string;
  type: GeoType;
  desc?: string;
  tags?: string[];
  init?: boolean;
  children?: OriginNode[];
}
