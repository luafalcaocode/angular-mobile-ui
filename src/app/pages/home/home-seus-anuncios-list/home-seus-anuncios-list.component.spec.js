"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var home_seus_anuncios_list_component_1 = require("./home-seus-anuncios-list.component");
describe('HomeSeusAnunciosListComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [home_seus_anuncios_list_component_1.HomeSeusAnunciosListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(home_seus_anuncios_list_component_1.HomeSeusAnunciosListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=home-seus-anuncios-list.component.spec.js.map