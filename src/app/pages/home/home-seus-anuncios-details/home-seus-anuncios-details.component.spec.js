"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var home_seus_anuncios_details_component_1 = require("./home-seus-anuncios-details.component");
describe('HomeSeusAnunciosDetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [home_seus_anuncios_details_component_1.HomeSeusAnunciosDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(home_seus_anuncios_details_component_1.HomeSeusAnunciosDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=home-seus-anuncios-details.component.spec.js.map