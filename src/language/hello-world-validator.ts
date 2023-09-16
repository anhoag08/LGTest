import { ValidationAcceptor, ValidationChecks } from 'langium';
import { HelloWorldAstType, Model} from './generated/ast';
import type { HelloWorldServices } from './hello-world-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloWorldServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloWorldValidator;
    const checks: ValidationChecks<HelloWorldAstType> = {
        Model: validator.checkUniqueKeywords
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloWorldValidator {

    // // our new validation function for defs
    // checkUniqueDefs(model: Model, accept: ValidationAcceptor): void {
    //     // create a set of visited functions
    //     // and report an error when we see one we've already seen
    //     const reported = new Set();
    //     model.defs.forEach(d => {
    //         if (reported.has(d.name)) {
    //             accept('error',  `Def has non-unique name '${d.name}'.`,  {node: d, property: 'name'});
    //         }
    //         reported.add(d.name);
    //     });
    // }

    checkUniqueKeywords(model: Model, accept: ValidationAcceptor): void {
        
    }
    
}