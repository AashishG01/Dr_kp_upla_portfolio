import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/client'; // Disabled for static deployment
import toast from 'react-hot-toast';

// Import local data
import profileData from '../data/profile.json';
import publicationsData from '../data/publications.json';
import studentsData from '../data/students.json';
import projectsData from '../data/projects.json';

const STATIC_MODE_MSG = "This feature is disabled in the static demo version.";

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            // Simulate network delay if desired, or just return data
            return profileData;
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedData) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Profile updated successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Error updating profile');
        },
    });
};

export const usePublications = () => {
    return useQuery({
        queryKey: ['publications'],
        queryFn: async () => {
            return publicationsData;
        },
    });
};

export const useCreatePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newData) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['publications']);
            toast.success('Publication added');
        },
        onError: (err) => {
            toast.error(err.message || 'Error adding publication');
        },
    });
};

export const useUpdatePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...data }) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['publications']);
            toast.success('Publication updated');
        },
        onError: (err) => {
            toast.error(err.message || 'Error updating publication');
        },
    });
};

export const useDeletePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['publications']);
            toast.success('Publication deleted');
        },
        onError: (err) => {
            toast.error(err.message || 'Error deleting publication');
        },
    });
};

export const useStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            return studentsData;
        },
    });
};

export const useCreateStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newData) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['students']);
            toast.success('Student added');
        },
        onError: (err) => {
            toast.error(err.message || 'Error adding student');
        },
    });
};

export const useUpdateStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...data }) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['students']);
            toast.success('Student updated');
        },
        onError: (err) => {
            toast.error(err.message || 'Error updating student');
        },
    });
};

export const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['students']);
            toast.success('Student deleted');
        },
        onError: (err) => {
            toast.error(err.message || 'Error deleting student');
        },
    });
};

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            return projectsData;
        },
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newData) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project added');
        },
        onError: (err) => {
            toast.error(err.message || 'Error adding project');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...data }) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project updated');
        },
        onError: (err) => {
            toast.error(err.message || 'Error updating project');
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            throw new Error(STATIC_MODE_MSG);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project deleted');
        },
        onError: (err) => {
            toast.error(err.message || 'Error deleting project');
        },
    });
};

