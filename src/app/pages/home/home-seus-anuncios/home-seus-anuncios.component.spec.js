"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var home_seus_anuncios_component_1 = require("./home-seus-anuncios.component");
describe('HomeSeusAnunciosComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [home_seus_anuncios_component_1.HomeSeusAnunciosComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(home_seus_anuncios_component_1.HomeSeusAnunciosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=home-seus-anuncios.component.spec.js.map