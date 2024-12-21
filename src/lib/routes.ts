import { cache } from "react";
import { USER_ROLES } from "./constant";
import { TUserRoleValue } from "@/types";



type TRoute = {
    access:TUserRoleValue[],
    subRoutes:Record<string,TRoute>
}

const protectedRoutes:Record<string,TRoute> = {
    "/dashboard":{
        access:[USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN],
        subRoutes:{
            "/manage-users":{
                access:[USER_ROLES.SUPER_ADMIN],
                subRoutes:{}
            },
        }
    },
}

const authRoutes = [
    "auth/login",
    "auth/register",
    "auth/verify-account",    
    "auth/reset-account",    
]


const flattenedRoutes = cache(function (
    routesObject:Record<string,TRoute>, 
    parentRoute:string = ""
) {
    
    let routesMap:Record<string,TUserRoleValue[]> = {}

    for (const subRoute in routesObject) {
        routesMap[parentRoute+subRoute] = routesObject[subRoute].access
        const fullRoute = parentRoute+subRoute
        const subRoutesObject = routesObject[subRoute].subRoutes
        const mappedSubRoutes = flattenedRoutes(subRoutesObject,fullRoute)
        routesMap = {
            ...routesMap,
           ...mappedSubRoutes,
        }
    }
    
    return routesMap
})

export function checkUserRouteAccess (userRole:TUserRoleValue|null,pathname:string) {

    if (userRole) {
        const canAccess = authRoutes.find(route => pathname.includes(route))
        if (canAccess) return false
    }

    const routesMap = flattenedRoutes(protectedRoutes)
    const routeAllowedRoles = routesMap[pathname]

    if (!routeAllowedRoles) {
        return true
    }
    
    const canAccess = routeAllowedRoles.find(role => role === userRole)
    return canAccess ? true : false
}
