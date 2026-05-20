import dotenv from 'dotenv';

const rawEnv = (process.env.TEST_ENV ?? process.env.PLAYWRIGHT_ENV ?? 'ec2').toLowerCase();

dotenv.config({
  path: `.env.${rawEnv}`
});

export type TestEnvironment = 'ec2' | 'dev' | 'qa';

export interface EnvironmentConfig {
  name: TestEnvironment;
  baseURL: string;
  authRequired: boolean;
  reportFolder: string;
  storageState: string;
  // loginPath: string;
  usernameKey: string;
  passwordKey: string;
  loginSelectors: {
    username: string;
    password: string;
    submitButton: string;
  };
}

// const rawEnv = (process.env.TEST_ENV ?? process.env.PLAYWRIGHT_ENV ?? 'ec2').toLowerCase();
const envName = rawEnv === 'dev' || rawEnv === 'qa' ? rawEnv : 'ec2';

const defaultConfig: Record<TestEnvironment, Omit<EnvironmentConfig, 'reportFolder' | 'storageState'>> = {
  ec2: {
    name: 'ec2',
    baseURL: 'http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com',
    authRequired: false,
    usernameKey: 'TEST_USERNAME',
    passwordKey: 'TEST_PASSWORD',
    loginSelectors: {
      username: 'input[name="username"], input#username, input[name="email"]',
      password: 'input[name="password"], input#password',
      submitButton: 'button[type="submit"], button:has-text("Sign in"), button:has-text("Login")'
    }
  },
  dev: {
    name: 'dev',
    baseURL: process.env.BASE_URL || 'http://lnx1779.ch3.dev.i.com/unify/',
    authRequired: true,
    usernameKey: 'TEST_USERNAME',
    passwordKey: 'TEST_PASSWORD',
    loginSelectors: {
      username: process.env.LOGIN_USERNAME_SELECTOR || 'input[name="username"], input#username, input[name="email"]',
      password: process.env.LOGIN_PASSWORD_SELECTOR || 'input[name="password"], input#password',
      submitButton: process.env.LOGIN_SUBMIT_SELECTOR || 'button[type="submit"], button:has-text("Sign in"), button:has-text("Login")'
    }
  },
  qa: {
    name: 'qa',
    baseURL: process.env.BASE_URL || 'https://qa.your-company-app.com',
    authRequired: true,
    usernameKey: 'TEST_USERNAME',
    passwordKey: 'TEST_PASSWORD',
    loginSelectors: {
      username: process.env.LOGIN_USERNAME_SELECTOR || 'input[name="username"], input#username, input[name="email"]',
      password: process.env.LOGIN_PASSWORD_SELECTOR || 'input[name="password"], input#password',
      submitButton: process.env.LOGIN_SUBMIT_SELECTOR || 'button[type="submit"], button:has-text("Sign in"), button:has-text("Login")'
    }
  }
};

const environment = defaultConfig[envName];

const envConfig: EnvironmentConfig = {
  ...environment,
  reportFolder: `playwright-report/${environment.name}`,
  storageState: `test-results/storageState-${environment.name}.json`
};

export const getCredentials = (): { username: string; password: string } => {
  const username = process.env[envConfig.usernameKey] ?? '';
  const password = process.env[envConfig.passwordKey] ?? '';

  if (envConfig.authRequired) {
    if (!username || !password) {
      throw new Error(
        `Missing credentials for ${envConfig.name} environment. Set ${envConfig.usernameKey} and ${envConfig.passwordKey} in environment variables.`
      );
    }
  }

  return { username, password };
};

export default envConfig;
