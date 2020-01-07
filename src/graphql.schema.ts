
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface IQuery {
    types(): Type[] | Promise<Type[]>;
    type(id: string): Type | Promise<Type>;
}

export interface Type {
    id?: string;
    key?: string;
    name?: string;
    index?: string;
    active?: boolean;
}
