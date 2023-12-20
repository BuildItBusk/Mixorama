using Microsoft.AspNetCore.Authorization;

public class HasScopeHandler : AuthorizationHandler<HasPermissionRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasPermissionRequirement requirement)
    {
        // If user does not have the permission, get out of here
        if (!context.User.HasClaim(c => c.Type == "scope" && c.Issuer == requirement.Issuer))
            return Task.CompletedTask;

        // Split the scopes string into an array
        var permissions = context.User?.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issuer)?.Value.Split(' ');

        // Succeed if the permission array contains the required scope
        if (permissions?.Any(s => s == requirement.Permission) ?? false)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}