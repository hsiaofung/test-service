import { TestBed, inject } from "@angular/core/testing";
import { StockService } from "./stock.service";
import { Stock } from "../model/stock";

describe("StockService", () => {
  var stockService: StockService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService], // 登記StockService的provider。這確保測試在測試模組中執行。
    });
  });

  beforeEach(inject([StockService], (service: StockService) => {
    // 將StockService 注入另一個beforeEach並儲存以供測試存取
    stockService = service;
  }));

  it("should be created", inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));

  it("should allow adding stocks", () => {
    expect(stockService.getStocks().length).toEqual(3); // 確保從服務的三個股票開始
    let stock = new Stock("Test A New Company", "TTT", 850, 800, "NASDAQ");
    expect(stockService.createStock(stock)).toBeTruthy(); // 加入股票並確保它回傳true
    expect(stockService.getStocks().length).toEqual(4); // 檢查加入服務的股票是否存在
    expect(stockService.getStocks()[3].code).toEqual("TTT");
  });

  it("should fetch a list of stocks", () => {
    expect(stockService.getStocks().length).toEqual(3); // 確保從服務的三個股票開始
    expect(stockService.getStocks()[0].code).toEqual("TSC");// 檢查股票以確保資料如預期。
    expect(stockService.getStocks()[1].code).toEqual("SSC");
    expect(stockService.getStocks()[2].code).toEqual("LSC");
  });
});
