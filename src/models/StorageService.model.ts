export interface StorageService {
    query(entityType: string): Promise<any[]>
    get(entityType: string, entityId: string): Promise<any>
    post(entityType: string, newEntity: any): Promise<any>
    postMany(entityType: string, newEntities: any[]): Promise<any[]>
    put(entityType: string, updatedEntity: any): Promise<any>
    remove(entityType: string, entityId: string): Promise<void>
}