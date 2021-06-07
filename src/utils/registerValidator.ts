import {ref} from "vue";



interface RegisterUser {
    name: string;
    email: string;
    password: string;
    password2: string;
    role: string;
}

export const registerUser = ref<RegisterUser>({
    name:"",
    email:"",
    password:"",
    password2: "",
    role:"",
});

interface RegisterRules {
    name: ({
        message: string;
        required: boolean;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    password2: ({
        required: boolean;
        message: string;
        trigger: string;

    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;

    } | {
        validator: (rule: RegisterRules, value: string, callback: any) => void;
        trigger: string;
    })[];
}

const validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerUser.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

export const registerRules = ref<RegisterRules>({
    name: [
        {
            message:"username could not be empty...",
            required: true,
            trigger: 'blur',
        }
    ],
    email: [
        { type:'email',
            message:"Email is incorrect...",
            required: true,
            trigger: 'blur',
        }
    ],
    password: [
        {
            message:"Password could not be empty...",
            trigger: 'blur',
            required: true
        },
        {
            min:6,
            max:30,
            message: "Password's length has to be 6 to 30 characters...",
            trigger: 'blur',
        }
    ],
    password2: [
        {
            message:"Password2 could not be empty...",
            trigger: 'blur',
            required: true
        },
        {
            min:6,
            max:30,
            message: "Password's length has to be 6 to 30 characters...",
            trigger: 'blur',
        },
        {
            validator: validatePass2,
            trigger: 'blur'
        }
    ],
});