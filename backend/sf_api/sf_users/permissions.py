from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the object.
        print(obj.owner)
        print(request.user)
        return obj.owner == request.user or request.user.is_staff
