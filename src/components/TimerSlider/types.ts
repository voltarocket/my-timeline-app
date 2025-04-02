 export type Period = {
    group: string;
    startYear: number;
    endYear: number;
    events: Event[];
  };
  
  export type Event = {
    year: string;
    description: string;
  };