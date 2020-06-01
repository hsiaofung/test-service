import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StockListComponent } from "./stock-list.component";
import { StockService } from "../../services/stock.service";
import { StockItemComponent } from "../../stock/stock-item/stock-item.component";
import { Stock } from "../../model/stock";

describe("StockListComponent with Real Service", () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent], // 將StockItemCompoent 加入TestBed的declarations陣列
      providers: [StockService], // 將StockService加入providers陣列
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should load stocks from real service on init", () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(3); // 確保元件中的股票從服務載入
  });
});

describe("StockListComponent With Mock Service", () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let stockService: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent],
      providers: [StockService],
    }).compileComponents;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    // 總是從注入程序取得服務
    stockService = fixture.debugElement.injector.get(StockService); // 透過元件的注入取得StockService
    let spy = spyOn(stockService, "getStocks").and.returnValue([
      // 模擬getStocks()呼叫並回傳寫死的值。
      new Stock("Mock Stock", "MS", 800, 900, "NYSE"),
    ]);
    fixture.detectChanges();
  });

  it("should load stocks from mocked service on init", () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1); // 確保股票來自模擬的值
    expect(component.stocks[0].code).toEqual("MS");
  });
});

describe("StockListComponent With Fake Service", () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    let stockServiceFake = {
      // 定義實作getStocks()方法的stockServiceFake物件。
      getStocks: () => {
        return [new Stock("Fake Stock", "FS", 800, 900, "NYSE")];
      },
    };
    TestBed.configureTestingModule({
      declarations: [StockListComponent, StockItemComponent],
      providers: [
        {
          provide: StockService, // 定義提供什麼類別
          useValue: stockServiceFake, // 指定StockService的實例
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should load stocks from fake service on init", () => {
    expect(component).toBeTruthy();
    expect(component.stocks.length).toEqual(1);
    expect(component.stocks[0].code).toEqual("FS"); // 確保值來自假服務
  });
});
