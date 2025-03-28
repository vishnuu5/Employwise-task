/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,jsx}",
	],
	theme: {
	  extend: {
		colors: {
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		  }
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
		  'accordion-down': {
			from: {
			  height: '0'
			},
			to: {
			  height: 'var(--radix-accordion-content-height)'
			}
		  },
		  'accordion-up': {
			from: {
			  height: 'var(--radix-accordion-content-height)'
			},
			to: {
			  height: '0'
			}
		  },
		  fadeIn: {
			from: { opacity: '0' },
			to: { opacity: '1' }
		  },
		  fadeOut: {
			from: { opacity: '1' },
			to: { opacity: '0' }
		  },
		  slideUp: {
			from: { transform: 'translateY(10px)', opacity: '0' },
			to: { transform: 'translateY(0)', opacity: '1' }
		  },
		  slideDown: {
			from: { transform: 'translateY(0)', opacity: '1' },
			to: { transform: 'translateY(10px)', opacity: '0' }
		  },
		  shimmer: {
			from: { backgroundPosition: '-468px 0' },
			to: { backgroundPosition: '468px 0' }
		  },
		  pulse: {
			'0%, 100%': { opacity: '1' },
			'50%': { opacity: '0.5' }
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-5px)' }
		  },
		  scaleIn: {
			from: { transform: 'scale(0.95)', opacity: '0' },
			to: { transform: 'scale(1)', opacity: '1' }
		  },
		  scaleOut: {
			from: { transform: 'scale(1)', opacity: '1' },
			to: { transform: 'scale(0.95)', opacity: '0' }
		  },
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out',
		  'fade-in': 'fadeIn 0.3s ease-out',
		  'fade-out': 'fadeOut 0.2s ease-in',
		  'slide-up': 'slideUp 0.3s ease-out',
		  'slide-down': 'slideDown 0.2s ease-in',
		  shimmer: 'shimmer 1.5s infinite linear',
		  pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		  float: 'float 3s ease-in-out infinite',
		  'scale-in': 'scaleIn 0.2s ease-out',
		  'scale-out': 'scaleOut 0.2s ease-in',
		},
		transitionTimingFunction: {
		  'apple-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
		},
		backdropFilter: {
		  'apple': 'blur(20px) saturate(180%)',
		},
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }
  