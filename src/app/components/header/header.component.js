"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(cartService, sharedService) {
        this.cartService = cartService;
        this.sharedService = sharedService;
        this._cart = { items: [] };
        this.itemsQuantity = 0;
    }
    HeaderComponent.prototype.showSideBar = function () {
        this.sharedService.triggerShowSideBar();
    };
    Object.defineProperty(HeaderComponent.prototype, "cart", {
        get: function () {
            return this._cart;
        },
        set: function (cart) {
            this._cart = cart;
            this.itemsQuantity = cart.items
                .map(function (item) { return item.quantity; })
                .reduce(function (prev, curent) { return prev + curent; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    HeaderComponent.prototype.getTotal = function (items) {
        return this.cartService.getTotal(items);
    };
    HeaderComponent.prototype.onClearCart = function () {
        this.cartService.clearCart();
    };
    __decorate([
        (0, core_1.Input)()
    ], HeaderComponent.prototype, "cart");
    HeaderComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ["./header.component.css"]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
