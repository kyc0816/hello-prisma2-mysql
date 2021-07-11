// fake data of 'project & user & projectUser' schema

export const users = [
    {
        name: "Bob Jones",
        email: "bjones@zcorp.com",
        password: "abc123"
    },
    {
        name: "Jane James",
        email: "jjames@zcorp.com",
        password: "bbc123"
    },
]

export const projects = [
    {
        title: "Site Upgrade",
        status: "active"
    },
    {
        title: "New Developer Onboarding",
        status: "completed"
    },
]

export const assignments = [
    {
        projectId: 1,
        userId: 1
    },
    {
        projectId: 2,
        userId: 1
    },
    {
        projectId: 1,
        userId: 2
    }
]