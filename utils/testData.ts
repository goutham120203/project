export const testData = {
  // Client names for different profile types
  clients: {
    manufacturer: {
      valid: 'ALCON',
      invalid: 'PEPSICO', // Used for testing outlet selection
      disabled: 'TEST_DISABLED' // Placeholder for disabled client
    },
    retailer: {
      valid: 'WALGREENS',
      alternative: 'TEST_RETAILER'
    },
    circana: {
      valid: 'CIRCANA_CLIENT'
    }
  },

  // Outlet options
  outlets: {
    manufacturer: {
      multiOutlet: 'Multi Outlet (MULO)',
      walmart: 'Walmart (WALM)',
      drug: 'Drug (DRUG)',
      food: 'Food (FOOD)',
      convenience: 'Convenience (CONV)'
    },
    retailer: {
      mulc: 'MULC',
      mass: 'MASS',
      conv: 'CONV'
    }
  },

  // Geography test data
  geography: {
    names: {
      test: 'testing Geo3',
      california: 'california'
    },
    versions: {
      v50: '50.2 | 10/19/2021'
    },
    summaries: {
      test: 'testing'
    },
    notes: {
      test: 'testing'
    },
    deliverables: {
      manufacturerUse: 'Available for Manufacturer Use'
    },
    states: {
      california: 'CA'
    },
    previousSets: {
      none: 'NONE - New Geography Set'
    },
    messages: {
      crmaApproved: 'CRMA data approved successfully',
      mappingSaved: 'Geography mappings have been saved successfully.',
      mappingApproved: 'Geography mapping successfully approved and moved to next stage.',
      releaseSaved: 'Release evaluation have been saved successfully.',
      releaseApproved: 'Release evaluation approved. Redirecting to Geography Naming...',
      namingApproved: 'Geography Naming successfully approved and moved to next stage.',
      finalReports: 'Final Reports Will Display'
    }
  },

  // Profile form data
  profiles: {
    manufacturer: {
      clientVisibleName: 'Testing',
      cccEligible: {
        yes: 'Yes',
        no: 'No'
      },
      notes: 'testing'
    },
    retailer: {
      clientVisibleName: 'WALGREENS testing',
      freshlook: {
        yes: 'Yes',
        no: 'No'
      },
      closedAndSold: {
        include: 'INCLUDE',
        exclude: 'EXCLUDE'
      },
      ownerNumber: '1',
      ownerNumberTest: '12345',
      bannerName: 'banner',
      notes: 'testing'
    },
    circana: {
      clientVisibleName: 'Circana Test Profile',
      notes: 'Updated circana note'
    }
  },

  // Search terms
  search: {
    profiles: {
      manufacturer: 'manu',
      retailer: 'retailer',
      partial: '30',
      full: '30/'
    },
    geography: {
      creation: 'geo-creation',
      testing: 'testing',
      convenience: 'Convenience'
    }
  },

  // Error messages
  errors: {
    client: {
      selectionRequired: 'Client selection is required.',
      visibleNameRequired: 'Client visible name is required.'
    },
    outlets: {
      required: 'Please select at least one outlet.',
      retailerRequired: 'Retailer outlet selection is required.'
    },
    banner: {
      required: 'Please fill in all banner fields. Owner number must be greater than 0.'
    },
    audit: {
      required: 'Please select at least one audit option.'
    },
    crma: {
      required: 'Please select at least one CRMA outlet option.'
    }
  },

  // Success messages
  success: {
    profileCreated: 'Profile created successfully',
    profileUpdated: 'Profile updated successfully',
    profileDeleted: 'Profile deleted successfully'
  },

  // Page titles and headings
  titles: {
    dashboard: 'Dashboard',
    profiles: 'Profiles',
    geography: 'Geography'
  },

  // Wait times (in milliseconds)
  timeouts: {
    short: 500,
    medium: 1000,
    long: 5000
  }
};

// Helper functions for generating dynamic test data
export const generateTestData = {
  clientVisibleName: (prefix: string = 'Test') => `${prefix} ${Date.now()}`,
  geographyName: (prefix: string = 'Geo') => `${prefix} ${Date.now()}`,
  notes: (content: string = 'Test notes') => `${content} - ${new Date().toISOString()}`
};

// Type definitions for better TypeScript support
export type ClientType = 'manufacturer' | 'retailer' | 'circana';
export type OutletType = 'manufacturer' | 'retailer';
export type CccEligible = 'Yes' | 'No';
export type Freshlook = 'Yes' | 'No';
export type ClosedAndSold = 'INCLUDE' | 'EXCLUDE';