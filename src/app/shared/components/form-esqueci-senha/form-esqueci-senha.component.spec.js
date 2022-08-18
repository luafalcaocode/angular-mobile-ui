"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var form_esqueci_senha_component_1 = require("./form-esqueci-senha.component");
describe('FormEsqueciSenhaComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [form_esqueci_senha_component_1.FormEsqueciSenhaComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(form_esqueci_senha_component_1.FormEsqueciSenhaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=form-esqueci-senha.component.spec.js.map