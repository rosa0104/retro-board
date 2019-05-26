export class RetroItemType {

  public static POSITIVE = new RetroItemType('positive', '😃');
  public static NEUTRAL = new RetroItemType('neutral', '😒');
  public static NEGATIVE = new RetroItemType('negative', '😠');


  id: string;
  symbol: string;


  private constructor(id: string, symbol: string) {
    this.id = id;
    this.symbol = symbol;
  }


}

export const VALUES = [RetroItemType.POSITIVE, RetroItemType.NEUTRAL, RetroItemType.NEGATIVE];
