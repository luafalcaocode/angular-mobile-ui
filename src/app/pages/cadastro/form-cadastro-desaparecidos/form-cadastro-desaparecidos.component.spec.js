"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var form_cadastro_desaparecidos_component_1 = require("./form-cadastro-desaparecidos.component");
describe('FormCadastroDesaparecidosComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [form_cadastro_desaparecidos_component_1.FormCadastroDesaparecidosComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(form_cadastro_desaparecidos_component_1.FormCadastroDesaparecidosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=form-cadastro-desaparecidos.component.spec.js.map