import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, Search, Plus, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const isJobSeeker = user.role === 'jobseeker';
  const isEmployer = user.role === 'employer';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">JobConnect</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isJobSeeker ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
                <span>{user.name}</span>
                <span className="px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                  {isJobSeeker ? 'Job Seeker' : 'Employer'}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome, {user.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {isJobSeeker
              ? 'Find and apply for jobs that match your skills'
              : 'Manage your job postings and find the best candidates'}
          </p>
        </div>

        {/* Role-based Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isJobSeeker && (
            <>
              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Browse Jobs</h3>
                <p className="text-sm text-muted-foreground">
                  Explore thousands of job opportunities from top employers
                </p>
              </div>

              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">My Applications</h3>
                <p className="text-sm text-muted-foreground">
                  Track the status of your job applications
                </p>
              </div>

              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">My Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Update your profile and manage your skills
                </p>
              </div>
            </>
          )}

          {isEmployer && (
            <>
              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Post a Job</h3>
                <p className="text-sm text-muted-foreground">
                  Create a new job listing to attract top talent
                </p>
              </div>

              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Manage Jobs</h3>
                <p className="text-sm text-muted-foreground">
                  View and manage your active job postings
                </p>
              </div>

              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Company Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Update your company information and branding
                </p>
              </div>
            </>
          )}
        </div>

        {/* Skills Section for Job Seekers */}
        {isJobSeeker && user.skillset && user.skillset.length > 0 && (
          <div className="mt-8 p-6 bg-card rounded-xl border border-border">
            <h3 className="text-lg font-medium text-foreground mb-4">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skillset.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-accent text-accent-foreground text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
